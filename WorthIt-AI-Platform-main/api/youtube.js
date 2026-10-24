const { run } = require("./_core");

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).json({ error: "Use GET." });
  const { status, body } = await run(
    req.query.handle,
    process.env.YOUTUBE_API_KEY,
  );
  res.setHeader(
    "Cache-Control",
    status === 200 ? "public, s-maxage=300" : "no-store",
  );
  res.status(status).json(body);
};
