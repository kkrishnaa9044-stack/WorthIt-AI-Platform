const API = "https://www.googleapis.com/youtube/v3";
const HANDLE_RE = /^@?[A-Za-z0-9._-]{3,30}$/;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function yt(path, params, key) {
  const u = new URL(API + path);
  Object.entries({ ...params, key }).forEach(([k, v]) =>
    u.searchParams.set(k, v),
  );
  const r = await fetch(u);
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const reason =
      j.error &&
      j.error.errors &&
      j.error.errors[0] &&
      j.error.errors[0].reason;
    if (reason === "quotaExceeded" || reason === "rateLimitExceeded")
      throw new HttpError(429, "YouTube API quota reached. Try again later.");
    if (/API key/i.test((j.error && j.error.message) || ""))
      throw new HttpError(
        500,
        "The server's YouTube API key was rejected. Check YOUTUBE_API_KEY.",
      );
    throw new HttpError(
      502,
      "YouTube API error" + (reason ? " (" + reason + ")" : "") + ".",
    );
  }
  return j;
}

const avg = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);

async function getCreator(handle, key) {
  const h = "@" + handle.replace(/^@/, "");
  const ch = await yt(
    "/channels",
    { part: "snippet,statistics,contentDetails", forHandle: h },
    key,
  );
  const c = ch.items && ch.items[0];
  if (!c) throw new HttpError(404, "No YouTube channel found for " + h + ".");
  const st = c.statistics || {};
  if (st.hiddenSubscriberCount || st.subscriberCount == null)
    throw new HttpError(
      422,
      "This channel hides its subscriber count, so engagement cannot be calculated.",
    );

  // Latest uploads (newest first), then their statistics. 2 more quota units in total.
  const up =
    c.contentDetails &&
    c.contentDetails.relatedPlaylists &&
    c.contentDetails.relatedPlaylists.uploads;
  const pl = up
    ? await yt(
        "/playlistItems",
        { part: "contentDetails", playlistId: up, maxResults: 12 },
        key,
      )
    : { items: [] };
  const ids = (pl.items || [])
    .map((i) => i.contentDetails && i.contentDetails.videoId)
    .filter(Boolean);
  if (ids.length < 3)
    throw new HttpError(
      422,
      "This channel needs at least 3 public videos to measure engagement.",
    );
  const vd = await yt(
    "/videos",
    { part: "statistics", id: ids.join(",") },
    key,
  );
  const by = {};
  (vd.items || []).forEach((v) => {
    by[v.id] = v.statistics || {};
  });
  const vs = ids
    .map((id) => by[id])
    .filter(Boolean)
    .map((s) => ({
      views: +s.viewCount || 0,
      likes: +s.likeCount || 0, // 0 when the creator hides likes
      comments: +s.commentCount || 0, // 0 when comments are off
    }));
  if (vs.length < 3)
    throw new HttpError(
      422,
      "This channel needs at least 3 public videos to measure engagement.",
    );

  const sn = c.snippet || {};
  const th = sn.thumbnails || {};
  return {
    id: c.id,
    handle: sn.customUrl || h,
    name: sn.title || h,
    thumb: (th.medium || th.default || {}).url || "",
    subs: +st.subscriberCount,
    views: +st.viewCount || 0,
    videos: +st.videoCount || 0,
    n: vs.length,
    avgViews: Math.round(avg(vs.map((v) => v.views))),
    avgLikes: Math.round(avg(vs.map((v) => v.likes))),
    avgComments: Math.round(avg(vs.map((v) => v.comments))),
    avgInter: Math.round(avg(vs.map((v) => v.likes + v.comments))),
    w: vs.map((v) => v.views).reverse(), // oldest -> newest
    at: new Date().toISOString(),
  };
}

async function run(handle, key) {
  if (!key)
    return {
      status: 500,
      body: {
        error: "Server is missing the YOUTUBE_API_KEY environment variable.",
      },
    };
  if (!HANDLE_RE.test(handle || ""))
    return {
      status: 400,
      body: { error: "Enter a valid handle such as @GoogleDevelopers." },
    };
  try {
    return { status: 200, body: await getCreator(handle, key) };
  } catch (e) {
    if (e instanceof HttpError)
      return { status: e.status, body: { error: e.message } };
    if (e instanceof TypeError)
      return {
        status: 502,
        body: { error: "Could not reach YouTube. Try again." },
      };
    return { status: 500, body: { error: "Unexpected server error." } };
  }
}

module.exports = { run, getCreator, HttpError };
