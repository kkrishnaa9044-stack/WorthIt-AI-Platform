const $ = (s) => document.querySelector(s),
  esc = (s) =>
    String(s ?? "").replace(
      /[&<>"]/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
        })[c],
    );
const PRE = {
  age: {
    young: [0.55, 0.35, 0.07, 0.03],
    core: [0.25, 0.5, 0.2, 0.05],
    mature: [0.1, 0.35, 0.35, 0.2],
    balanced: [0.3, 0.35, 0.25, 0.1],
  },
  geo: {
    metro: [0.7, 0.22, 0.08],
    mixed: [0.45, 0.35, 0.2],
    tier2: [0.25, 0.45, 0.3],
  },
};
const BM = {
    C1: 6,
    B1: 4,
    B2: 2.8,
    A1: 1.8,
    A2: 1.2,
  },
  NICHES = [
    "food",
    "skincare",
    "beauty",
    "fashion",
    "fitness",
    "tech",
    "gaming",
    "finance",
    "travel",
    "parenting",
    "education",
  ];
const RATES = {
  food: 400,
  skincare: 550,
  beauty: 550,
  fashion: 500,
  fitness: 450,
  tech: 700,
  gaming: 350,
  finance: 800,
  travel: 500,
  parenting: 400,
  education: 450,
};
const ADJ = {};
[
  ["skincare", "beauty", 0.85],
  ["skincare", "food", 0.76],
  ["skincare", "fitness", 0.7],
  ["skincare", "parenting", 0.6],
  ["skincare", "fashion", 0.55],
  ["beauty", "fashion", 0.75],
  ["food", "fitness", 0.8],
  ["food", "travel", 0.55],
  ["fitness", "parenting", 0.5],
  ["tech", "gaming", 0.75],
  ["tech", "finance", 0.45],
  ["travel", "fashion", 0.5],
].forEach(([a, b, v]) => (ADJ[[a, b].sort().join("-")] = v));
const med = (a) => {
  const s = [...a].sort((x, y) => x - y),
    m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
function wk(r, k, spike) {
  const w = Array.from(
    {
      length: 12,
    },
    (_, i) =>
      Math.round(
        r * (1 + 0.1 * Math.sin(i * 1.3 + k) + 0.05 * Math.cos(i * 2.1)),
      ),
  );
  if (spike) w[8] = Math.round(r * spike);
  return w;
}
const D = (id, name, plat, niche, fol, reach, er, age, geo, o = {}) => ({
  id,
  name,
  plat,
  niche,
  sec: o.sec || [],
  fol,
  reach,
  inter: Math.round((er * fol) / 100),
  age: PRE.age[age],
  geo: PRE.geo[geo],
  rep: o.rep ?? 0.1,
  growth: o.gr ?? 8,
  w: wk(reach, id.length + (fol % 7), o.spike),
  sample: 1,
});
const SEED = () => ({
  c: [
    D(
      "priya",
      "Priya Shah",
      "Instagram",
      "food",
      40000,
      12000,
      4.2,
      "core",
      "metro",
    ),
    D(
      "aanya",
      "Aanya Verma",
      "Instagram",
      "skincare",
      85000,
      26000,
      3.4,
      "young",
      "metro",
    ),
    D(
      "meera",
      "Meera Kapoor",
      "Instagram",
      "beauty",
      62000,
      31000,
      9.8,
      "young",
      "mixed",
      {
        rep: 0.52,
        spike: 4.1,
      },
    ),
    D(
      "rohan",
      "Rohan Mehta",
      "YouTube",
      "tech",
      210000,
      48000,
      2.1,
      "core",
      "metro",
    ),
    D(
      "kavya",
      "Kavya Nair",
      "Instagram",
      "fitness",
      28000,
      9500,
      5.6,
      "core",
      "metro",
    ),
    D(
      "arjun",
      "Arjun Rao",
      "YouTube",
      "gaming",
      120000,
      30000,
      1.8,
      "young",
      "tier2",
      {
        sec: ["tech"],
      },
    ),
    D(
      "simran",
      "Simran Kaur",
      "Instagram",
      "fashion",
      150000,
      40000,
      1.9,
      "young",
      "metro",
      {
        gr: 31,
      },
    ),
    D(
      "dev",
      "Dev Malhotra",
      "YouTube",
      "finance",
      95000,
      22000,
      3.9,
      "mature",
      "metro",
    ),
    D(
      "tanvi",
      "Tanvi Joshi",
      "Instagram",
      "parenting",
      18000,
      6200,
      6.1,
      "mature",
      "tier2",
    ),
    D(
      "imran",
      "Imran Sheikh",
      "YouTube",
      "travel",
      56000,
      15500,
      3,
      "core",
      "mixed",
    ),
    D(
      "lakshmi",
      "Lakshmi Iyer",
      "Instagram",
      "skincare",
      9000,
      3600,
      7.4,
      "young",
      "tier2",
    ),
    D(
      "karan",
      "Karan Bedi",
      "Instagram",
      "skincare",
      480000,
      90000,
      1.2,
      "young",
      "metro",
    ),
  ],
  b: [
    {
      id: "A",
      name: "GlowLab Skincare Launch",
      niche: "skincare",
      budget: 60000,
      n: 3,
      plat: "Instagram",
      min: 0,
      strict: false,
      age: [0.45, 0.45, 0.08, 0.02],
      geo: [0.6, 0.3, 0.1],
      sample: 1,
    },
    {
      id: "B",
      name: "ByteBox Budget Earbuds",
      niche: "tech",
      budget: 150000,
      n: 2,
      plat: "YouTube",
      min: 0,
      strict: false,
      age: PRE.age.core,
      geo: PRE.geo.mixed,
      sample: 1,
    },
    {
      id: "C",
      name: "FitFuel Millet Snacks",
      niche: "fitness",
      budget: 40000,
      n: 2,
      plat: "Instagram",
      min: 0,
      strict: false,
      age: PRE.age.core,
      geo: PRE.geo.mixed,
      sample: 1,
    },
  ],
  rates: {
    ...RATES,
  },
  lo: 0.6,
  hi: 1.5,
  ov: null,
  sc: "priya",
  sb: "A",
  pitch: "",
});
let S;
try {
  S = JSON.parse(localStorage.getItem("worthit1"));
} catch (e) {}
S = S || SEED();
const save = () => {
  try {
    localStorage.setItem("worthit1", JSON.stringify(S));
  } catch (e) {}
};
let U = {
  page: "dashboard",
  q: "",
  pf: "All",
  msg: null,
  ed: null,
  res: null,
  anim: true,
};
// ---- theme: white or black
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  const b = $("#th");
  if (b) {
    b.textContent = t === "dark" ? "Light mode" : "Dark mode";
    b.setAttribute("aria-pressed", String(t === "dark"));
  }
}
function toggleTheme() {
  const t =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("worthit-theme", t);
  } catch (e) {}
  const root = document.documentElement;
  root.classList.add("theming");
  setTimeout(() => root.classList.remove("theming"), 450);
  applyTheme(t);
}
// ---- logic
const tier = (f) =>
    f < 1e4 ? "C1" : f < 3e4 ? "B1" : f < 1e5 ? "B2" : f < 5e5 ? "A1" : "A2",
  er = (c) => (c.fol > 0 ? (c.inter / c.fol) * 100 : 0),
  ratio = (c) => er(c) / BM[tier(c.fol)];
const mult = (r) => (r < 0.75 ? 0.8 : r < 1.25 ? 1 : r < 2 ? 1.2 : 1.5),
  engS = (r) => (r < 1 ? 80 * r : Math.min(100, 80 + 24 * (r - 1)));
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
function cons(w) {
  const m = w.reduce((a, b) => a + b, 0) / w.length;
  if (!m)
    return {
      v: 0,
      cv: null,
    };
  const cv = Math.sqrt(w.reduce((a, b) => a + (b - m) ** 2, 0) / w.length) / m;
  return {
    v: clamp(100 - 200 * cv, 0, 100),
    cv,
  };
}
function auth(c) {
  const m = med(c.w),
    f = [],
    r = ratio(c);
  let s = 100;
  if (c.rep > 0.35) {
    s -= 30;
    f.push("Comment repetition ratio " + c.rep + " is above 0.35");
  }
  if (m > 0 && Math.max(...c.w) / m > 3) {
    s -= 30;
    f.push(
      "Peak weekly reach is " +
        (Math.max(...c.w) / m).toFixed(1) +
        "× the median (above 3×)",
    );
  }
  if (c.growth > 25) {
    s -= 25;
    f.push("Weekly follower growth of " + c.growth + "% is above 25%");
  }
  if (r > 3) {
    s -= 15;
    f.push("Engagement ratio " + r.toFixed(2) + " is above 3");
  }
  s = Math.max(0, s);
  return {
    s,
    f,
    label:
      f.length >= 2 || s < 70
        ? "Review suggested"
        : f.length == 1
          ? "Note"
          : "No rule-based flag",
  };
}
function cvs(c) {
  const r = ratio(c),
    e = engS(r),
    k = cons(c.w),
    a = auth(c);
  return {
    e,
    k,
    a,
    r,
    v: 0.45 * e + 0.35 * k.v + 0.2 * a.s,
  };
}
function earn(c) {
  const r = ratio(c),
    rate = S.rates[c.niche],
    m = S.ov || mult(r),
    base = (c.reach * rate) / 1000,
    mid = base * m;
  return {
    r,
    rate,
    m,
    base,
    mid,
    low: mid * S.lo,
    high: mid * S.hi,
  };
}
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN"),
  K = (n) =>
    n >= 1000
      ? "₹" + Math.round(n / 100) / 10 + "K"
      : inr(Math.round(n / 100) * 100);
const lab = (v) =>
  v >= 90 ? "High fit" : v >= 75 ? "Medium fit" : "Developing fit";
function budgetFit(r) {
  return r <= 1 ? (r >= 0.5 ? 100 : 60 + 80 * r) : 100 - 160 * (r - 1);
}
function nicheS(b, c) {
  if (b.niche === c.niche) return 100;
  const a = ADJ[[b.niche, c.niche].sort().join("-")];
  if (a) return a * 100;
  return c.sec.includes(b.niche) ? 60 : 0;
}
const ov = (p, q) => p.reduce((s, v, i) => s + Math.min(v, q[i]), 0);
function cms(b, c) {
  const e = earn(c),
    a = auth(c),
    r = e.mid / (b.budget / b.n),
    rs = ratio(c),
    n = nicheS(b, c),
    bf = budgetFit(r),
    eq = engS(rs);
  let au = 50,
    note = "Audience data missing: neutral 50 used";
  const ag = c.age && b.age ? ov(c.age, b.age) : null,
    ge = c.geo && b.geo ? ov(c.geo, b.geo) : null;
  if (ag != null && ge != null) {
    au = 100 * (0.6 * ag + 0.4 * ge);
    note = `age overlap ${ag.toFixed(2)}, geography overlap ${ge.toFixed(2)}`;
  }
  const why = [];
  if (b.plat !== "Any" && c.plat !== b.plat)
    why.push("PLATFORM: " + c.plat + " is not an allowed platform");
  if (c.fol < b.min)
    why.push("MIN_FOLLOWERS: below " + b.min.toLocaleString("en-IN"));
  if (b.strict && n === 0) why.push("STRICT_NICHE: no niche match");
  if (r > 1.25)
    why.push(
      "OVER_BUDGET: midpoint " +
        inr(e.mid) +
        " is " +
        r.toFixed(2) +
        "× the " +
        inr(b.budget / b.n) +
        " per-creator budget (limit 1.25×)",
    );
  const sc = 0.3 * n + 0.25 * bf + 0.2 * eq + 0.15 * au + 0.1 * a.s;
  return {
    c,
    n,
    bf,
    eq,
    au,
    a: a.s,
    sc,
    r,
    note,
    why,
    e,
    flag: a.label,
  };
}
const match = (b) => {
  const all = S.c.map((c) => cms(b, c));
  return {
    ok: all
      .filter((x) => !x.why.length)
      .sort(
        (x, y) => y.sc - x.sc || y.a - x.a || x.c.name.localeCompare(y.c.name),
      ),
    no: all.filter((x) => x.why.length),
  };
};
const streams = (c) => {
  const r = ratio(c),
    e = earn(c),
    o = [];
  const comm = [
      "skincare",
      "beauty",
      "fashion",
      "tech",
      "fitness",
      "food",
    ].includes(c.niche),
    ws = ["food", "fitness", "finance", "education", "parenting"].includes(
      c.niche,
    );
  o.push([
    "Sponsored short-form",
    c.reach >= 3000,
    `average reach ${c.reach.toLocaleString("en-IN")} vs 3,000 needed; indicative ${K(e.low)}–${K(e.high)} per post`,
  ]);
  o.push([
    "Affiliate",
    r >= 1 && comm,
    `engagement ratio ${r.toFixed(2)} (needs 1.0) and niche "${c.niche}" ${comm ? "suits" : "is not in the"} affiliate list`,
  ]);
  o.push([
    "Workshops / paid community",
    c.fol >= 15000 && r >= 1.25 && ws,
    `followers ${c.fol.toLocaleString("en-IN")} (15,000), ratio ${r.toFixed(2)} (1.25), niche ${ws ? "fits" : "does not fit"}`,
  ]);
  o.push([
    "Memberships",
    r >= 1.5 && c.fol >= 10000,
    `ratio ${r.toFixed(2)} (1.5) and followers ${c.fol.toLocaleString("en-IN")} (10,000)`,
  ]);
  if (c.plat === "YouTube")
    o.push([
      "YouTube ad revenue",
      true,
      "YouTube profile; check current platform eligibility thresholds",
    ]);
  return o;
};
// ---- ui helpers
const stamp = (t) =>
  `<span class="st ${
    {
      LIVE: "live",
      ESTIMATE: "est",
      SAMPLE: "smp",
      PLANNED: "pln",
    }[t]
  }">${t}</span>`;
const bar = (l, v, x = "") =>
  `<div>${l}: <b>${v.toFixed(1)}</b> ${x}<div class="bar"><i style="width:${clamp(v, 0, 100)}%"></i></div></div>`;
const gc = (id) => S.c.find((c) => c.id === id) || S.c[0],
  gb = (id) => S.b.find((b) => b.id === id) || S.b[0];
function chart(w, vid) {
  const M = Math.max(...w, 1),
    W = 360,
    H = 130,
    bw = W / 12,
    L = vid ? "V" : "W";
  return `<svg viewBox="0 0 ${W} ${H + 20}" role="img" aria-label="${vid ? "Views of the latest videos, oldest first" : "Weekly reach for the last 12 weeks, in people reached"}" style="width:100%;max-width:560px">${w
    .map((v, i) => {
      const h = (v / M) * H;
      return `<rect class="cb${v === M ? " pk" : ""}" style="--i:${i}" rx="3" x="${i * bw + 3}" y="${H - h}" width="${bw - 6}" height="${h}"/><text x="${i * bw + bw / 2}" y="${H + 14}" font-size="9" text-anchor="middle" style="fill:var(--mut)">${L}${i + 1}</text>`;
    })
    .join(
      "",
    )}<text x="2" y="9" font-size="9" style="fill:var(--mut)">peak ${M.toLocaleString("en-IN")} people reached</text></svg>`;
}
const msg = () =>
  U.msg
    ? `<div class="msg ${U.msg[0]}" role="status">${esc(U.msg[1])}</div>`
    : "";
const sel = (id, opts, v, fn) =>
  `<select id="${id}" onchange="(${fn})(this.value)">${opts.map(([a, b]) => `<option value="${esc(a)}" ${a == v ? "selected" : ""}>${esc(b)}</option>`).join("")}</select>`;
function go(p) {
  U.page = p;
  U.msg = null;
  U.res = null;
  U.yt = null;
  U.anim = true;
  render();
  scrollTo(0, 0);
}
// ---- pages
const P = {};
P.overview = () => {
  const c = gc("priya"),
    e = earn(c),
    fl = S.c.filter((x) => auth(x).label !== "No rule-based flag").length,
    demo = {
      ...c,
      reach: 12000,
    },
    ex = (12000 * 400) / 1000;
  return `<h1>Every number shows its working.</h1><p class="sf" style="font-size:1.25rem;max-width:40em">WorthIt estimates what a creator's audience is worth, suggests revenue streams, and matches creators to brands at prices you can inspect.</p>
<p>${stamp("SAMPLE")}${stamp("LIVE")}${stamp("ESTIMATE")}${stamp("PLANNED")}<span class="t">Instagram connection: planned. Nothing here is guaranteed income.</span></p>
<p>${role() === "brand" ? `<button class="b" onclick="go('match')">Open Brand Matchmaker</button>` : `<button class="b" onclick="go('studio')">Open my profile</button>`}</p>
<div class="g"><div class="card"><div class="big">${S.c.length}</div>creators ${stamp("SAMPLE")}</div><div class="card"><div class="big">${S.b.length}</div>campaign briefs ${stamp("SAMPLE")}</div><div class="card"><div class="big">${fl}</div>profiles with review flags ${stamp("LIVE")}</div></div>
<div class="card"><h3>Worked example ${stamp("ESTIMATE")}${stamp("SAMPLE")}</h3><p class="mono">12,000 reach × ₹400 ÷ 1,000 = ${inr(ex)}<br>× 1.2 (engagement ratio 1.5) = ${inr(ex * 1.2)}<br>low ×0.6 = ${inr(ex * 1.2 * 0.6)} · high ×1.5 = ${inr(ex * 1.2 * 1.5)}</p><div class="sf" style="font-size:2.4rem;color:var(--sf)">${K(ex * 1.2 * 0.6)}–${K(ex * 1.2 * 1.5)}</div><p class="t">Indicative range, not a guaranteed price.</p></div>
<h2>How it works</h2><ol class="card"><li>Enter or edit a creator's consented metrics in Creator Studio.</li><li>Read engagement, consistency and the Creator Value Score.</li><li>Open Earnings Lab for an editable low, mid and high range.</li><li>Create a brand brief in Brand Matchmaker.</li><li>Review ranked and rejected creators with reasons.</li><li>Draft and download a pitch in Pitch Desk.</li></ol>`;
};
P.studio = () => {
  const c = gc(U.ed === "new" ? "" : own() ? me().cid : S.sc),
    list = S.c.filter(
      (x) =>
        (!own() || x.id === me().cid) &&
        (U.pf === "All" || x.plat === U.pf) &&
        (x.name + x.niche).toLowerCase().includes(U.q.toLowerCase()),
    );
  return `<h2>Creator Studio</h2>${msg()}${own() ? ytBox("self") : ""}<div class="g2"><div><div class="f"><label>Search<input value="${esc(U.q)}" onchange="U.q=this.value;render()"></label><label>Platform${sel(
    "pf",
    [
      ["All", "All"],
      ["Instagram", "Instagram"],
      ["YouTube", "YouTube"],
    ],
    U.pf,
    "v=>{U.pf=v;render()}",
  )}</label></div>${own() ? "" : `<p><button class="b s" onclick="U.ed='new';render()">Add creator</button></p>`}
${list.length ? list.map((x) => `<button class="row ${x.id === S.sc && U.ed !== "new" ? "on" : ""}" onclick="S.sc='${x.id}';U.ed=null;U.msg=null;save();render()"><span class="who">${avatar(x)}<span>${esc(x.name)}<br><span class="t">${x.plat} · ${x.niche}</span></span></span>${x.sample ? stamp("SAMPLE") : ""}</button>`).join("") : '<p class="msg">No creators match. Clear the search or add a creator.</p>'}</div><div>${U.ed === "new" ? form(null) : U.ed ? form(gc(U.ed)) : studioDetail(c)}</div></div>`;
};
function studioDetail(c) {
  const v = cvs(c),
    a = v.a;
  return `<div class="card"><div class="who head">${avatar(c, true)}<h3>${esc(c.name)} ${c.sample ? stamp("SAMPLE") : ""}${stamp("LIVE")}</h3></div>
<div class="g"><div>Followers<div class="sf" style="font-size:1.8rem">${c.fol.toLocaleString("en-IN")}</div>Tier ${tier(c.fol)}</div><div>Average reach<div class="sf" style="font-size:1.8rem">${c.reach.toLocaleString("en-IN")}</div>${((c.reach / c.fol) * 100).toFixed(1)}% of followers</div><div>Engagement rate<div class="sf" style="font-size:1.8rem">${er(c).toFixed(1)}%</div><span class="t">interactions per post ÷ followers × 100; tier benchmark ${BM[tier(c.fol)]}% (demo assumption)</span></div><div>Consistency<div class="sf" style="font-size:1.8rem">${v.k.v.toFixed(0)}</div><span class="t">100 − 200 × CV, 12 weeks</span></div></div></div>
<div class="card"><h3>${c.src === "youtube" ? "Views, latest videos (oldest first)" : "Reach, last 12 weeks"}</h3>${chart(c.w, c.src === "youtube")}${c.yt ? `<p class="t">Source: YouTube Data API v3, fetched ${esc(c.yt.at)}. ${c.yt.views.toLocaleString("en-IN")} total views, ${c.yt.videos.toLocaleString("en-IN")} videos.</p>` : ""}</div>
<div class="card"><h3>Creator Value Score: ${v.v.toFixed(1)} / 100 ${stamp("LIVE")}</h3>${bar("Engagement (45%)", v.e)}${bar("Consistency (35%)", v.k.v)}${bar("Authenticity (20%)", a.s)}
<details><summary>Show me why</summary><p class="mono">engagement ratio = ${er(c).toFixed(2)} ÷ ${BM[tier(c.fol)]} = ${v.r.toFixed(2)}<br>engagement score = ${v.e.toFixed(1)}<br>CV = ${v.k.cv == null ? "n/a (mean 0)" : v.k.cv.toFixed(3)} → consistency ${v.k.v.toFixed(1)}<br>CVS = 0.45×${v.e.toFixed(1)} + 0.35×${v.k.v.toFixed(1)} + 0.20×${a.s} = ${v.v.toFixed(1)}</p><p class="t">Profile-level only: it never includes campaign niche or budget. It describes signals in the data, not a person's worth.</p></details></div>
<div class="card"><h3>Authenticity review: ${a.label} ${stamp("LIVE")}</h3>${a.f.length ? a.f.map((x) => `<div class="flag">${esc(x)}</div>`).join("") + "<p><b>Unusual pattern; human review suggested.</b> These are rule-based signals, not a verdict.</p>" : "<p>No rule-based flag.</p>"}</div>
<p><button class="b" onclick="S.sc='${c.id}';go('earnings')">Open Earnings Lab</button> <button class="b s" onclick="U.ed='${c.id}';render()">Edit</button> ${own() ? "" : `<button class="b d" onclick="delC('${c.id}')">Delete</button>`}</p>`;
}
function form(c) {
  c = c || {
    id: "",
    name: "",
    plat: "Instagram",
    niche: "food",
    fol: 10000,
    inter: 400,
    reach: 3000,
  };
  const fid = U.ed && U.ed !== "new" ? U.ed : "new";
  return `<div class="card"><h3>${U.ed === "new" ? "Add creator" : "Edit creator"}</h3>${msg()}<div class="who head">${avatar(c, true)}<span class="t">Optional photo: resized to 192px and kept only in this browser. Add one only with the creator's consent.</span></div><div class="f"><label>Name<input id="fn" value="${esc(c.name)}"></label><label>Platform<select id="fp"><option>Instagram</option><option ${c.plat == "YouTube" ? "selected" : ""}>YouTube</option></select></label><label>Niche<select id="fni">${NICHES.map((n) => `<option ${n == c.niche ? "selected" : ""}>${n}</option>`).join("")}</select></label><label>Followers<input id="ff" type="number" value="${c.fol}"></label><label>Average reach<input id="fr" type="number" value="${c.reach}"></label><label>Avg interactions per post<input id="fi" type="number" value="${c.inter}"></label><label>Profile photo<input id="fph" type="file" accept="image/*"></label>${c.photo ? '<label class="chk"><input id="fpx" type="checkbox"> Remove current photo</label>' : ""}</div><p><button class="b" onclick="saveC('${fid}')">Save creator</button> <button class="b s" onclick="U.ed=null;U.msg=null;render()">Cancel</button></p></div>`;
}
async function saveC(id) {
  const g = (x) => $(x).value,
    n = g("#fn").trim(),
    f = +g("#ff"),
    r = +g("#fr"),
    i = +g("#fi"),
    pl = g("#fp"),
    ni = g("#fni"),
    file = $("#fph")?.files[0],
    rmPhoto = !!$("#fpx")?.checked;
  if (n.length < 2 || n.length > 60)
    return err("Name needs 2 to 60 characters.");
  if (!(f >= 1)) return err("Followers must be at least 1.");
  if (!(r >= 0) || !(i >= 0))
    return err("Reach and interactions must be zero or more.");
  let photo = null;
  if (file) {
    try {
      photo = await readPhoto(file);
    } catch (e) {
      return err(e.message);
    }
  }
  if (id === "new") {
    const o = {
      id: "u" + Date.now(),
      name: n,
      plat: pl,
      niche: ni,
      sec: [],
      fol: f,
      reach: r,
      inter: i,
      photo: photo || undefined,
      age: PRE.age.balanced,
      geo: PRE.geo.mixed,
      rep: 0.1,
      growth: 8,
      w: wk(r, 3),
    };
    S.c.push(o);
    S.sc = o.id;
  } else {
    const t = gc(id);
    Object.assign(t, {
      name: n,
      plat: pl,
      niche: ni,
      fol: f,
      reach: r,
      inter: i,
      sample: 0,
    });
    if (photo) t.photo = photo;
    else if (rmPhoto) delete t.photo;
  }
  U.ed = null;
  U.msg = ["", "Creator saved."];
  save();
  render();
}
function err(m) {
  U.msg = ["e", m];
  render();
}
function delC(id) {
  if (
    !confirm(
      "Delete this creator? This cannot be undone (you can reset the demo data).",
    )
  )
    return;
  S.c = S.c.filter((c) => c.id !== id);
  S.sc = S.c[0]?.id;
  save();
  U.msg = ["", "Creator deleted."];
  render();
}
P.earnings = () => {
  const c = gc(own() ? me().cid : S.sc),
    e = earn(c),
    s = streams(c);
  return `<h2>Earnings Lab</h2>${msg()}<label style="max-width:320px">Creator${sel(
    "ec",
    S.c.filter((x) => !own() || x.id === me().cid).map((x) => [x.id, x.name]),
    c.id,
    "v=>{S.sc=v;U.msg=null;render()}",
  )}</label>
<div class="card"><h3>Assumptions ${stamp("ESTIMATE")}</h3><div class="f"><label>Rate per 1,000 reach, ${c.niche} (₹50–5,000)<input id="er" type="number" value="${S.rates[c.niche]}"></label><label>Multiplier override (0.5–3, blank = automatic ${mult(e.r)})<input id="eo" type="number" step=".1" value="${S.ov ?? ""}"></label><label>Low factor (0.1–1)<input id="el" type="number" step=".05" value="${S.lo}"></label><label>High factor (1–3)<input id="eh" type="number" step=".05" value="${S.hi}"></label></div><p><button class="b" onclick="saveE('${c.niche}')">Apply assumptions</button> <button class="b s" onclick="S.rates={...RATES};S.ov=null;S.lo=.6;S.hi=1.5;save();U.msg=['','Defaults restored.'];render()">Reset defaults</button></p></div>
<div class="card"><h3>Indicative range ${stamp("ESTIMATE")}${stamp("LIVE")}</h3><div class="big">${K(e.low)}–${K(e.high)}</div><p>Midpoint ${K(e.mid)} per sponsored post. <b>Indicative range, not a guaranteed price.</b></p>
<details open><summary>Show me why: step by step</summary><p class="mono">base = ${c.reach.toLocaleString("en-IN")} × ${inr(e.rate)} ÷ 1,000 = ${inr(e.base)}<br>engagement ratio = ${e.r.toFixed(2)} → multiplier ${e.m}${S.ov ? " (override)" : ""}<br>midpoint = ${inr(e.base)} × ${e.m} = ${inr(e.mid)}<br>low = ${inr(e.mid)} × ${S.lo} = ${inr(e.low)}<br>high = ${inr(e.mid)} × ${S.hi} = ${inr(e.high)}</p><p class="t">Rates are sample assumptions, not market data.</p></details></div>
<div class="card"><h3>Revenue streams ${stamp("ESTIMATE")}</h3><div class="tw"><table><tr><th>Stream</th><th>Status</th><th>Why</th></tr>${s.map((x) => `<tr><td>${x[0]}</td><td>${x[1] ? "Eligible" : "Not yet"}</td><td>${esc(x[2])}</td></tr>`).join("")}</table></div></div><button class="b" onclick="go('pitch')">Draft a pitch</button>`;
};
function saveE(n) {
  const r = +$("#er").value,
    o = $("#eo").value,
    l = +$("#el").value,
    h = +$("#eh").value;
  if (!(r >= 50 && r <= 5e3))
    return err("Rate must be between ₹50 and ₹5,000.");
  if (o !== "" && !(+o >= 0.5 && +o <= 3))
    return err("Multiplier override must be between 0.5 and 3.");
  if (!(l >= 0.1 && l <= 1))
    return err("Low factor must be between 0.1 and 1.");
  if (!(h >= 1 && h <= 3)) return err("High factor must be between 1 and 3.");
  S.rates[n] = r;
  S.ov = o === "" ? null : +o;
  S.lo = l;
  S.hi = h;
  save();
  U.msg = ["", "Assumptions applied."];
  render();
}
P.match = () => {
  const b = gb(S.sb),
    R = match(b);
  return `<h2>Brand Matchmaker</h2>${msg()}<label style="max-width:360px">Brief${sel(
    "sbf",
    S.b.map((x) => [x.id, x.name]),
    b.id,
    "v=>{S.sb=v;U.msg=null;render()}",
  )}</label>
${ytBox("pool")}
<div class="card"><h3>${U.ed === "newb" ? "New brief" : "Brief"} ${b.sample && U.ed !== "newb" ? stamp("SAMPLE") : ""}</h3>${(() => {
    const q =
      U.ed === "newb"
        ? {
            name: "",
            niche: "food",
            budget: 50000,
            n: 2,
            plat: "Any",
            min: 0,
            strict: false,
          }
        : b;
    return `<div class="f"><label>Name<input id="bn" value="${esc(q.name)}"></label><label>Niche<select id="bni">${NICHES.map((n) => `<option ${n == q.niche ? "selected" : ""}>${n}</option>`).join("")}</select></label><label>Total budget (₹)<input id="bb" type="number" value="${q.budget}"></label><label>Creators needed<input id="bc" type="number" value="${q.n}"></label><label>Platform<select id="bp">${["Any", "Instagram", "YouTube"].map((n) => `<option ${n == q.plat ? "selected" : ""}>${n}</option>`).join("")}</select></label><label>Minimum followers<input id="bm" type="number" value="${q.min}"></label><label>Target age<select id="ba"><option value="keep">Keep current</option>${Object.keys(
      PRE.age,
    )
      .map((n) => `<option>${n}</option>`)
      .join(
        "",
      )}</select></label><label>Target geography<select id="bg"><option value="keep">Keep current</option>${Object.keys(
      PRE.geo,
    )
      .map((n) => `<option>${n}</option>`)
      .join(
        "",
      )}</select></label><label><input id="bs" type="checkbox" style="width:auto" ${q.strict ? "checked" : ""}> Strict niche</label></div>`;
  })()}
<p><button class="b" onclick="saveB()">Save brief</button> <button class="b s" onclick="U.ed='newb';render()">New brief</button> <button class="b d" onclick="delB()">Delete brief</button></p></div>
<div class="card"><h3>Ranked matches ${stamp("LIVE")}${stamp("ESTIMATE")} <span class="t">per-creator budget ${inr(b.budget / b.n)}</span></h3>${
    R.ok.length
      ? `<div class="tw"><table><tr><th>#</th><th>Creator</th><th>Campaign Match Score</th><th>Rate (mid)</th><th>Review</th><th></th></tr>${R.ok.map((x, i) => `<tr><td>${i + 1}</td><td><span class="who">${avatar(x.c)}<span>${esc(x.c.name)}<br><span class="t">${x.c.plat} · ${x.c.niche}</span></span></span></td><td><b>${x.sc.toFixed(1)}</b> ${lab(x.sc)}</td><td>${K(x.e.mid)}</td><td>${x.flag}</td><td><button class="b s" onclick="S.sc='${x.c.id}';U.pc='${x.c.id}';go('pitch')">Draft pitch</button></td></tr>`).join("")}</table></div>
${R.ok.map((x) => `<details><summary>Show me why: ${esc(x.c.name)}</summary>${bar("Niche relevance (30%)", x.n)}${bar("Budget fit (25%)", x.bf, `<span class="t">midpoint ÷ budget = ${x.r.toFixed(2)}</span>`)}${bar("Engagement quality (20%)", x.eq)}${bar("Audience fit (15%)", x.au, `<span class="t">${x.note}</span>`)}${bar("Authenticity (10%)", x.a)}<p class="mono">CMS = 0.30×${x.n.toFixed(1)} + 0.25×${x.bf.toFixed(1)} + 0.20×${x.eq.toFixed(1)} + 0.15×${x.au.toFixed(1)} + 0.10×${x.a} = ${x.sc.toFixed(1)}</p></details>`).join("")}
<p><button class="b s" onclick="csv()">Download CSV</button></p>`
      : '<p class="msg">No creators are eligible. Raise the budget or loosen the filters.</p>'
  }</div>
<div class="card"><h3>Rejected ${stamp("LIVE")}</h3>${R.no.length ? `<div class="tw"><table><tr><th>Creator</th><th>Reason codes</th><th>Review</th></tr>${R.no.map((x) => `<tr><td>${esc(x.c.name)}</td><td>${x.why.map(esc).join("<br>")}</td><td>${x.flag}${x.flag !== "No rule-based flag" ? '<br><span class="t">Unusual pattern; human review suggested.</span>' : ""}</td></tr>`).join("")}</table></div>` : "<p>Nobody was rejected for this brief.</p>"}</div>`;
};
function saveB() {
  const g = (x) => $(x).value,
    nw = U.ed === "newb",
    n = g("#bn").trim(),
    bu = +g("#bb"),
    c = +g("#bc"),
    m = +g("#bm");
  if (n.length < 2) return err("Brief name needs at least 2 characters.");
  if (!(bu > 0) || !(c >= 1) || !(m >= 0))
    return err(
      "Budget must be above 0, creators at least 1, minimum followers 0 or more.",
    );
  const q = nw
    ? {
        id: "b" + Date.now(),
        age: PRE.age.balanced,
        geo: PRE.geo.mixed,
      }
    : gb(S.sb);
  Object.assign(q, {
    name: n,
    niche: g("#bni"),
    budget: bu,
    n: Math.round(c),
    plat: g("#bp"),
    min: m,
    strict: $("#bs").checked,
    sample: 0,
  });
  if (g("#ba") !== "keep") q.age = PRE.age[g("#ba")];
  if (g("#bg") !== "keep") q.geo = PRE.geo[g("#bg")];
  if (nw) {
    S.b.push(q);
    S.sb = q.id;
  }
  U.ed = null;
  save();
  U.msg = ["", "Brief saved."];
  render();
}
function delB() {
  if (S.b.length < 2) return err("Keep at least one brief.");
  if (!confirm("Delete this brief?")) return;
  S.b = S.b.filter((b) => b.id !== S.sb);
  S.sb = S.b[0].id;
  save();
  U.msg = ["", "Brief deleted."];
  render();
}
function dl(name, txt, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([txt], {
      type,
    }),
  );
  a.download = name;
  a.click();
}
function csv() {
  const b = gb(S.sb),
    R = match(b);
  dl(
    "worthit-matches.csv",
    ["rank,creator,platform,niche,cms,fit,midpoint_inr,review"]
      .concat(
        R.ok.map((x, i) =>
          [
            i + 1,
            '"' + x.c.name + '"',
            x.c.plat,
            x.c.niche,
            x.sc.toFixed(1),
            lab(x.sc),
            Math.round(x.e.mid),
            x.flag,
          ].join(","),
        ),
      )
      .join("\n"),
    "text/csv",
  );
}
function pitchTxt(c, b, t) {
  const x = cms(b, c),
    e = x.e;
  const hi = `${esc(c.name)}`.length && c.name;
  const fit = `${c.name} creates ${c.niche} content on ${c.plat} with ${c.fol.toLocaleString("en-IN")} followers, an engagement rate of ${er(c).toFixed(1)}% (tier benchmark ${BM[tier(c.fol)]}%) and ${c.reach.toLocaleString("en-IN")} average reach.`;
  const rate = `Indicative rate for one sponsored post: ${K(e.low)}–${K(e.high)} (an estimate, open to discussion).`;
  if (t === "Concise")
    return `Hi, ${b.name}: ${fit} ${rate} Happy to share details.`;
  if (t === "Professional")
    return `Dear team,\n\nI would like to propose a collaboration on ${b.name}.\n\n${fit} Our match score for this brief is ${x.sc.toFixed(1)}/100 (${lab(x.sc)}).\n\n${rate}\n\nI would welcome the chance to discuss deliverables.\n\nKind regards,\n${c.name}`;
  return `Hi there!\n\nI'd love to be part of ${b.name}. ${fit}\n\nThe match looks promising: niche fit ${x.n.toFixed(0)}/100 and audience fit ${x.au.toFixed(0)}/100. ${rate}\n\nCould we chat about what you have in mind?\n\n${c.name}`;
}
P.pitch = () => {
  const c = gc(own() ? me().cid : U.pc || S.sc),
    b = gb(S.sb);
  U.t = U.t || "Friendly";
  return `<h2>Pitch Desk</h2><div class="f"><label>Creator${sel(
    "pcs",
    S.c.filter((x) => !own() || x.id === me().cid).map((x) => [x.id, x.name]),
    c.id,
    "v=>{U.pc=v;S.pitch='';render()}",
  )}</label><label>Brief${sel(
    "pbs",
    S.b.map((x) => [x.id, x.name]),
    b.id,
    "v=>{S.sb=v;S.pitch='';render()}",
  )}</label><label>Tone${sel(
    "pts",
    ["Friendly", "Professional", "Concise"].map((x) => [x, x]),
    U.t,
    "v=>{U.t=v;S.pitch='';render()}",
  )}</label></div>
<p><button class="b" onclick="S.pitch=pitchTxt(gc('${c.id}'),gb('${b.id}'),U.t);render()">Generate pitch</button></p>
${S.pitch ? `<div class="card"><h3>Editable draft ${stamp("LIVE")}</h3><textarea rows="12" oninput="S.pitch=this.value">${esc(S.pitch)}</textarea><p><button class="b" onclick="dl('worthit-pitch.txt',S.pitch,'text/plain')">Download TXT</button></p><p class="t">Drafted only from the data in this app. Check every claim before sending.</p></div>` : '<p class="msg">Choose a creator, brief and tone, then generate a draft.</p>'}`;
};
// ---- images: generated avatars and optional photo upload
const AVP = [
  ["#111111", "#f2efe8"],
  ["#E4560A", "#111111"],
  ["#d9d3c3", "#111111"],
  ["#2b2b2b", "#f2efe8"],
  ["#e8e2d3", "#9a3a09"],
];
function avatar(c, big) {
  const cls = "av" + (big ? " lg" : "");
  if (c.photo)
    return `<img class="${cls}" src="${esc(c.photo)}" alt="" width="${big ? 56 : 40}" height="${big ? 56 : 40}">`;
  const n = String(c.name || "?").trim() || "?";
  let h = 0;
  for (const ch of n) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const [bg, fg] = AVP[h % AVP.length],
    ini = n
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w.charAt(0))
      .join("")
      .toUpperCase();
  return `<svg class="${cls}" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="${bg}"/><circle cx="35" cy="5" r="10" fill="${fg}" opacity=".12"/><text x="20" y="25.5" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="${fg}">${esc(ini)}</text></svg>`;
}
function readPhoto(file) {
  return new Promise((resolve, reject) => {
    if (!/^image\//.test(file.type))
      return reject(new Error("Choose an image file."));
    if (file.size > 8e6) return reject(new Error("Image must be under 8 MB."));
    const fr = new FileReader();
    fr.onerror = () => reject(new Error("Could not read that image."));
    fr.onload = () => {
      const im = new Image();
      im.onerror = () => reject(new Error("That image could not be opened."));
      im.onload = () => {
        const s = Math.min(im.naturalWidth, im.naturalHeight);
        if (!s) return reject(new Error("That image has no size."));
        const cv = document.createElement("canvas"),
          cx = cv.getContext("2d");
        cv.width = cv.height = 192;
        cx.fillStyle = "#ffffff";
        cx.fillRect(0, 0, 192, 192);
        cx.drawImage(
          im,
          (im.naturalWidth - s) / 2,
          (im.naturalHeight - s) / 2,
          s,
          s,
          0,
          0,
          192,
          192,
        );
        resolve(cv.toDataURL("image/jpeg", 0.82));
      };
      im.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}
// ---- motion helpers: page entrance and count-up numbers
const fmtNum = (v, pre = "", suf = "", dec = 0) =>
    pre +
    (+v || 0).toLocaleString("en-IN", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    }) +
    suf,
  num = (v, pre = "", suf = "", dec = 0) =>
    `<span data-count="${+v || 0}" data-pre="${pre}" data-suf="${suf}" data-dec="${dec}">${fmtNum(v, pre, suf, dec)}</span>`;
function countUp(animate) {
  const calm =
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-count]").forEach((el) => {
    const to = +el.dataset.count,
      pre = el.dataset.pre || "",
      suf = el.dataset.suf || "",
      dec = +el.dataset.dec || 0,
      show = (v) => {
        el.textContent = fmtNum(v, pre, suf, dec);
      };
    if (!animate || calm || !(to > 0)) return show(to);
    const t0 = performance.now();
    show(0);
    const tick = (t) => {
      if (!el.isConnected) return;
      const p = Math.max(0, Math.min(1, (t - t0) / 900));
      show(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}
function play(anim) {
  countUp(anim);
  if (!anim) return;
  const a = $("#app");
  void a.offsetWidth;
  a.classList.add("enter");
}
// ---- YouTube import (real data via /api/youtube; the API key stays on the server)
const YT = () =>
  U.yt ||
  (U.yt = {
    q: "",
    niche: "tech",
    busy: false,
    err: "",
    d: null,
  });
async function ytSearch() {
  const y = YT(),
    h = y.q.trim();
  y.d = null;
  y.err = "";
  if (!/^@?[A-Za-z0-9._-]{3,30}$/.test(h)) {
    y.err = "Enter a handle like @GoogleDevelopers.";
    return render();
  }
  y.busy = true;
  render();
  try {
    const r = await fetch("/api/youtube?handle=" + encodeURIComponent(h)),
      j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || "Request failed (" + r.status + ").");
    y.d = j;
  } catch (e) {
    y.err =
      e instanceof TypeError
        ? 'Could not reach the server. Run the site with "vercel dev" or "netlify dev", or deploy it, so /api/youtube exists.'
        : e.message;
  }
  y.busy = false;
  render();
}
const ytToC = (d, niche) => ({
  name: d.name,
  plat: "YouTube",
  niche,
  fol: d.subs,
  reach: d.avgViews,
  inter: d.avgInter,
  w: d.w,
  photo: d.thumb || undefined,
  src: "youtube",
  yt: {
    id: d.id,
    handle: d.handle,
    views: d.views,
    videos: d.videos,
    n: d.n,
    likes: d.avgLikes,
    comments: d.avgComments,
    at: String(d.at).slice(0, 10),
  },
  sample: 0,
});
function ytUse(mode) {
  const y = YT(),
    d = y.d;
  if (!d) return;
  let id;
  if (mode === "self") {
    const t = gc(me().cid),
      o = ytToC(d, t.niche);
    delete o.name;
    Object.assign(t, o);
    id = t.id;
  } else {
    const o = ytToC(d, y.niche);
    id = "yt_" + d.id;
    const t = S.c.find((c) => c.id === id);
    if (t) Object.assign(t, o);
    else
      S.c.push({
        id,
        sec: [],
        age: PRE.age.balanced,
        geo: PRE.geo.mixed,
        rep: 0.1,
        growth: 8,
        ...o,
      });
  }
  S.sc = id;
  y.d = null;
  y.q = "";
  U.msg = [
    "",
    mode === "self"
      ? "Profile updated from YouTube."
      : d.name +
        " added to the creator list and scored against the selected brief.",
  ];
  save();
  render();
}
function ytResult(d, mode) {
  const y = YT(),
    n = (x) => x.toLocaleString("en-IN"),
    c = ytToC(d, mode === "self" ? gc(me().cid).niche : y.niche),
    v = cvs(c),
    e = earn(c),
    bx = (l, x, s = "") =>
      `<div>${l}<div class="sf" style="font-size:1.4rem">${x}</div>${s}</div>`;
  let fit = "";
  if (mode !== "self") {
    const b = gb(S.sb),
      x = cms(b, {
        ...c,
        id: "preview",
        sec: [],
        age: PRE.age.balanced,
        geo: PRE.geo.mixed,
        rep: 0.1,
        growth: 8,
      });
    fit = `<p><b>Against “${esc(b.name)}”:</b> ${x.why.length ? "would be rejected. " + x.why.map(esc).join("; ") : "Campaign Match Score " + x.sc.toFixed(1) + " (" + lab(x.sc) + ")"}</p>`;
  }
  return `<div class="who head" style="margin-top:1rem">${avatar(
    {
      photo: d.thumb,
      name: d.name,
    },
    true,
  )}<h3>${esc(d.name)} ${stamp("LIVE")}</h3></div><p class="t">${esc(d.handle)} · fetched from YouTube Data API v3</p>
<div class="g">${bx("Subscribers", n(d.subs))}${bx("Total views", n(d.views))}${bx("Total videos", n(d.videos))}${bx("Recent engagement", er(c).toFixed(2) + "%", `<span class="t">(avg likes + comments) ÷ subscribers</span>`)}</div>
<p class="t">Latest ${d.n} videos, averages: ${n(d.avgViews)} views · ${n(d.avgLikes)} likes · ${n(d.avgComments)} comments. Likes or comments hidden by the creator count as 0.</p>
<p><b>Creator Value Score ${v.v.toFixed(1)} / 100</b> · engagement ratio ${v.r.toFixed(2)} · indicative range ${K(e.low)}–${K(e.high)} per post ${stamp("ESTIMATE")}</p>${fit}
<p class="t">Audience age and location, comment repetition and follower growth are not available from the API; demo defaults are used for them.</p>
<p><button class="b" onclick="ytUse('${mode}')">${mode === "self" ? "Use this data for my profile" : "Add to creator list"}</button></p>`;
}
const ytBox = (mode) => {
  const y = YT();
  return `<div class="card"><h3>Import from YouTube ${stamp("LIVE")}</h3><div class="f"><label>Channel handle<input id="yq" value="${esc(y.q)}" placeholder="@GoogleDevelopers" autocomplete="off" oninput="YT().q=this.value" onkeydown="if(event.key==='Enter')ytSearch()"></label>${
    mode === "self"
      ? ""
      : `<label>Niche${sel(
          "yn",
          NICHES.map((n) => [n, n]),
          y.niche,
          "v=>{YT().niche=v;render()}",
        )}</label>`
  }</div>
<p><button class="b" ${y.busy ? "disabled" : ""} onclick="ytSearch()">${y.busy ? "Searching…" : "Search"}</button></p>${y.busy ? '<p class="t" role="status">Loading channel data from YouTube…</p>' : ""}${y.err ? `<div class="msg e" role="alert">${esc(y.err)}</div>` : ""}${y.d ? ytResult(y.d, mode) : ""}</div>`;
};
// ---- dashboard
const greet = () => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  },
  REASON = {
    PLATFORM: "Platform mismatch",
    MIN_FOLLOWERS: "Below minimum followers",
    STRICT_NICHE: "No niche match",
    OVER_BUDGET: "Above brief budget",
  };
const ring = (v) =>
  `<svg class="ring" viewBox="0 0 120 120" role="img" aria-label="Creator Value Score ${v.toFixed(0)} out of 100"><circle class="rt" cx="60" cy="60" r="52"/><circle class="rv" cx="60" cy="60" r="52" pathLength="100" style="stroke-dasharray:${clamp(v, 0, 100)} 100"/><text class="rn" x="60" y="70" text-anchor="middle">${v.toFixed(0)}</text></svg>`;
const heroImg =
  '<img class="hero" src="images/hero.svg" alt="" width="640" height="400">';
function dashCreator() {
  const u = me(),
    c = gc(u.cid),
    v = cvs(c),
    e = earn(c),
    s = streams(c),
    ok = s.filter((x) => x[1]),
    fits = S.b
      .map((b) => ({
        b,
        x: cms(b, c),
      }))
      .sort((p, q) => p.x.why.length - q.x.why.length || q.x.sc - p.x.sc),
    first = esc(String(u.name).split(" ")[0]);
  return `<section class="hero-card"><div class="hc-text"><p class="eyebrow">${greet()}</p><h1>${first}, here is what your audience is worth.</h1><p class="lead">Indicative range per sponsored post: <b>${K(e.low)}–${K(e.high)}</b> (an estimate, not a guaranteed price).</p><div class="acts"><button class="b" onclick="go('earnings')">Open Earnings Lab</button><button class="b s" onclick="U.ed='${c.id}';go('studio')">Edit my profile</button></div></div>${heroImg}</section>
<div class="kpis"><div class="kpi"><span class="k">Creator Value Score ${stamp("LIVE")}</span><div class="kv sf">${num(v.v, "", "", 1)}<small>/100</small></div><span class="t">A signal in the data, not a person's worth</span></div><div class="kpi"><span class="k">Followers</span><div class="kv sf">${num(c.fol)}</div><span class="t">Tier ${tier(c.fol)} · ${esc(c.plat)}</span></div><div class="kpi"><span class="k">Engagement rate</span><div class="kv sf">${num(er(c), "", "%", 1)}</div><span class="t">Tier benchmark ${BM[tier(c.fol)]}% (demo assumption)</span></div><div class="kpi"><span class="k">Midpoint per post ${stamp("ESTIMATE")}</span><div class="kv sf">${num(e.mid, "₹")}</div><span class="t">Estimate, not a guaranteed price</span></div></div>
<div class="dash"><div><div class="card"><h3>${c.src === "youtube" ? "Views, latest videos" : "Reach, last 12 weeks"} ${stamp("LIVE")}</h3>${chart(c.w, c.src === "youtube")}</div>
<div class="card"><h3>Briefs you fit ${stamp("LIVE")}</h3>${fits.length ? fits.map(({ b, x }) => `<div class="item"><div class="grow"><b>${esc(b.name)}</b><br><span class="t">${x.why.length ? esc(REASON[x.why[0].split(":")[0]] || "Not eligible") : lab(x.sc) + " · midpoint " + K(x.e.mid)}</span></div>${x.why.length ? '<span class="st pln">Not eligible</span>' : `<b class="sf">${x.sc.toFixed(0)}</b><button class="b s sm" onclick="S.sb='${b.id}';U.pc='${c.id}';go('pitch')">Draft pitch</button>`}</div>`).join("") : '<p class="t">No briefs yet.</p>'}</div></div>
<div><div class="card"><h3>Creator Value Score ${stamp("LIVE")}</h3><div class="rc">${ring(v.v)}<div class="grow">${bar("Engagement (45%)", v.e)}${bar("Consistency (35%)", v.k.v)}${bar("Authenticity (20%)", v.a.s)}</div></div></div>
<div class="card"><h3>Revenue streams ${stamp("ESTIMATE")}</h3><p class="t">${ok.length} of ${s.length} eligible right now</p>${s.map((x) => `<div class="item"><span class="grow">${x[0]}</span><span class="st ${x[1] ? "live" : "pln"}">${x[1] ? "Eligible" : "Not yet"}</span></div>`).join("")}</div>
<div class="card"><h3>Authenticity review ${stamp("LIVE")}</h3><p><b>${v.a.label}</b></p>${v.a.f.map((x) => `<div class="flag">${esc(x)}</div>`).join("")}${v.a.f.length ? '<p class="t">Rule-based signals for human review, not a verdict.</p>' : ""}</div></div></div>`;
}
function dashBrand() {
  const u = me(),
    b = gb(S.sb),
    R = match(b),
    per = b.budget / b.n,
    top = R.ok.slice(0, 3),
    cnt = {},
    pool = S.c.length || 1;
  R.no.forEach((x) =>
    x.why.forEach((w) => {
      const k = w.split(":")[0];
      cnt[k] = (cnt[k] || 0) + 1;
    }),
  );
  const cover = Math.min(1, R.ok.length / b.n) * 100;
  return `<section class="hero-card"><div class="hc-text"><p class="eyebrow">${greet()}</p><h1>${esc(u.name)}, your shortlist is taking shape.</h1><p class="lead">Brief: <b>${esc(b.name)}</b> · per-creator budget <b>${inr(per)}</b></p><div class="acts"><button class="b" onclick="go('match')">Open Brand Matchmaker</button><button class="b s" onclick="csv()">Download CSV</button></div></div>${heroImg}</section>
<label class="pick">Brief${sel(
    "dbf",
    S.b.map((x) => [x.id, x.name]),
    b.id,
    "v=>{S.sb=v;U.msg=null;render()}",
  )}</label>
<div class="kpis"><div class="kpi"><span class="k">Total budget</span><div class="kv sf">${num(b.budget, "₹")}</div><span class="t">${b.n} creator${b.n == 1 ? "" : "s"} needed</span></div><div class="kpi"><span class="k">Per creator</span><div class="kv sf">${num(per, "₹")}</div><span class="t">Midpoints above 1.25× this are rejected</span></div><div class="kpi"><span class="k">Eligible creators ${stamp("LIVE")}</span><div class="kv sf">${num(R.ok.length)}<small>/${S.c.length}</small></div><span class="t">${R.no.length} rejected, with reasons</span></div><div class="kpi"><span class="k">Top match score</span><div class="kv sf">${top[0] ? num(top[0].sc, "", "", 1) : "—"}</div><span class="t">${top[0] ? esc(top[0].c.name) : "No eligible creator"}</span></div></div>
<div class="dash"><div><div class="card"><h3>Top matches ${stamp("LIVE")}${stamp("ESTIMATE")}</h3>${top.length ? top.map((x, i) => `<div class="item"><span class="rank">${i + 1}</span>${avatar(x.c)}<div class="grow"><b>${esc(x.c.name)}</b><br><span class="t">${x.c.plat} · ${x.c.niche} · ${lab(x.sc)}</span></div><div class="end"><b>${x.sc.toFixed(1)}</b><br><span class="t">${K(x.e.mid)} mid</span></div><button class="b s sm" onclick="S.sc='${x.c.id}';U.pc='${x.c.id}';go('pitch')">Draft pitch</button></div>`).join("") + `<p><button class="b s" onclick="go('match')">See all ${R.ok.length} matches</button></p>` : '<p class="msg">No creators are eligible. Raise the budget or loosen the filters in Brand Matchmaker.</p>'}</div></div>
<div><div class="card"><h3>Shortlist coverage</h3><p class="t">${Math.min(R.ok.length, b.n)} of ${b.n} slot${b.n == 1 ? "" : "s"} have an eligible match</p><div class="bar"><i style="width:${cover}%"></i></div></div>
<div class="card"><h3>Why creators were rejected ${stamp("LIVE")}</h3>${
    Object.keys(cnt).length
      ? Object.entries(cnt)
          .map(
            ([k, n]) =>
              `<div class="rb"><span>${esc(REASON[k] || k)}</span><b>${n}</b></div><div class="bar"><i style="width:${(n / pool) * 100}%"></i></div>`,
          )
          .join("")
      : '<p class="t">Nobody was rejected for this brief.</p>'
  }</div></div></div>`;
}
P.dashboard = () => (role() === "brand" ? dashBrand() : dashCreator());
P.method =
  () => `<h2>Method and trust</h2><div class="card"><h3>Status legend</h3><p>${stamp("LIVE")} computed in your browser now. ${stamp("SAMPLE")} fictional demo records. ${stamp("ESTIMATE")} assumptions and ranges, never guarantees. ${stamp("PLANNED")} not built: Instagram connection, payments. YouTube import is live (public data only, via a server function).</p></div>
<div class="card"><h3>Formulas</h3><pre class="mono" style="white-space:pre-wrap">Engagement rate = avg interactions per post ÷ followers × 100
Reach rate = avg reach ÷ followers × 100
Consistency = clamp(100 − 200 × CV, 0, 100); CV = population std ÷ mean of 12 weekly reach values
Tiers: C1 <10k · B1 10–29.9k · B2 30–99.9k · A1 100–499.9k · A2 ≥500k
Benchmarks (demo assumptions): C1 6% · B1 4% · B2 2.8% · A1 1.8% · A2 1.2%
Creator Value Score = 0.45 × engagement + 0.35 × consistency + 0.20 × authenticity
Earnings: base = reach × rate ÷ 1000; mid = base × multiplier; low = mid × 0.6; high = mid × 1.5
Multiplier: ratio <0.75 → 0.8 · <1.25 → 1.0 · <2 → 1.2 · else 1.5
Campaign Match Score = 30% niche + 25% budget + 20% engagement + 15% audience + 10% authenticity
Budget fit: r = midpoint ÷ (budget ÷ creators); r≤1: 100 if r≥0.5 else 60+80r; 1&lt;r≤1.25: 100−160(r−1); r&gt;1.25 rejected</pre></div>
<div class="card"><h3>Limits and privacy</h3><ul><li>CVS and CMS are separate. Neither measures a person's worth.</li><li>Review flags are rule-based signals for human review, not conclusions about anyone.</li><li>Rates and benchmarks are sample assumptions, not market data.</li><li>YouTube imports use public channel data from the official API. Reach = average views of the latest videos (up to 12), interactions = likes + comments, and consistency uses those videos instead of weeks. Audience mix, comment repetition and follower growth are not available, so demo defaults apply.</li><li>Data stays in this browser (localStorage). Enter real creator data only with their consent. No scraping. The YouTube and Gemini keys live only on the server; the optional AI Assistant sends your question and a summary of the data you can see to Google's Gemini API through it.</li></ul><p><button class="b d" onclick="if(confirm('Reset all creators, briefs and assumptions to the demo data?')){S=SEED();U.ed=null;U.msg=['','Demo data restored.'];save();render()}">Reset demo data</button></p></div>`;

// ---- demo accounts (browser-only; not real security)
let A;
try {
  A = JSON.parse(localStorage.getItem("worthit-auth"));
} catch (e) {}
A = A || {
  users: [],
  cur: null,
};
const saveA = () => {
  try {
    localStorage.setItem("worthit-auth", JSON.stringify(A));
  } catch (e) {}
};
const me = () => A.users.find((u) => u.email === A.cur),
  role = () => me()?.role,
  own = () => role() === "creator",
  ROLES = {
    creator: [
      "dashboard",
      "studio",
      "earnings",
      "pitch",
      "assistant",
      "overview",
      "method",
    ],
    brand: ["dashboard", "match", "pitch", "assistant", "overview", "method"],
  };
let L = {
  mode: "in",
  role: "creator",
};
async function hash(p) {
  try {
    const b = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode("worthit:" + p),
    );
    return [...new Uint8Array(b)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
  } catch (e) {
    return null;
  }
}
function setL(k, v) {
  L[k] = v;
  U.msg = null;
  render();
}
P.login =
  () => `<div class="auth"><div class="auth-art"><img class="hero" src="images/hero.svg" alt="" width="640" height="400"><h1>Sign in to WorthIt</h1><p class="sf lead">Creators see what their audience is worth. Brands find creators at prices they can inspect.</p></div><div class="auth-form">${msg()}
<div class="card"><div style="display:flex;gap:.5rem;flex-wrap:wrap"><button class="b ${L.role == "creator" ? "" : "s"}" aria-pressed="${L.role == "creator"}" onclick="setL('role','creator')">I'm a creator</button><button class="b ${L.role == "brand" ? "" : "s"}" aria-pressed="${L.role == "brand"}" onclick="setL('role','brand')">I'm a brand</button></div>
<div style="display:flex;gap:1rem;margin:.8rem 0"><button class="b s" style="${L.mode == "in" ? "border-width:2px" : ""}" onclick="setL('mode','in')">Sign in</button><button class="b s" style="${L.mode == "up" ? "border-width:2px" : ""}" onclick="setL('mode','up')">Create account</button></div>
<div class="f" style="grid-template-columns:1fr">${L.mode == "up" ? `<label>${L.role == "brand" ? "Brand name" : "Your name"}<input id="ln" autocomplete="name"></label>` : ""}<label>Email<input id="le" type="email" autocomplete="email"></label><label>Password (8+ characters)<input id="lp" type="password" autocomplete="${L.mode == "up" ? "new-password" : "current-password"}" onkeydown="if(event.key==='Enter')doAuth()"></label></div>
<p><button class="b" onclick="doAuth()">${L.mode == "up" ? "Create " + L.role + " account" : "Sign in as " + L.role}</button></p>
<p class="t">${stamp("SAMPLE")} Demo accounts live only in this browser, with the password stored as a one-way hash. ${stamp("PLANNED")} Real authentication and a server.</p></div>
<div class="card"><h3>Try it without an account</h3><p class="t">Opens a prepared sample account.</p><button class="b s" onclick="demo('creator')">Demo creator: Priya Shah</button> <button class="b s" onclick="demo('brand')">Demo brand: GlowLab</button></div></div></div>`;
async function doAuth() {
  const em = $("#le").value.trim().toLowerCase(),
    pw = $("#lp").value;
  if (!/^\S+@\S+\.\S+$/.test(em)) return err("Enter a valid email address.");
  if (pw.length < 8) return err("Password needs at least 8 characters.");
  const h = await hash(pw);
  if (!h)
    return err(
      "This browser cannot hash passwords here. Open the page over https.",
    );
  if (L.mode === "up") {
    const n = $("#ln").value.trim();
    if (n.length < 2 || n.length > 60)
      return err("Enter a name of 2 to 60 characters.");
    if (A.users.some((u) => u.email === em))
      return err("That email already has an account. Choose Sign in.");
    const u = {
      email: em,
      name: n,
      role: L.role,
      h,
    };
    if (L.role === "creator") {
      const o = {
        id: "u" + Date.now(),
        name: n,
        plat: "Instagram",
        niche: "food",
        sec: [],
        fol: 10000,
        inter: 400,
        reach: 3000,
        age: PRE.age.balanced,
        geo: PRE.geo.mixed,
        rep: 0.1,
        growth: 8,
        w: wk(3000, 3),
      };
      S.c.push(o);
      u.cid = o.id;
      save();
    }
    A.users.push(u);
    A.cur = em;
    saveA();
    enter(L.role === "creator");
  } else {
    const u = A.users.find((x) => x.email === em && x.role === L.role);
    if (!u || u.h !== h)
      return err(
        "Email, password or role does not match. Check the role you selected.",
      );
    A.cur = em;
    saveA();
    enter(false);
  }
}
function enter(first) {
  U.msg = null;
  U.ed = null;
  U.page = "dashboard";
  U.anim = true;
  if (own()) {
    S.sc = me().cid;
    if (first) {
      U.page = "studio";
      U.ed = me().cid;
      U.msg = ["", "Account created. Fill in your profile metrics."];
    }
  }
  render();
}
function demo(r) {
  const em = r == "creator" ? "priya@demo.worthit" : "brand@demo.worthit";
  if (!A.users.some((u) => u.email === em))
    A.users.push(
      r == "creator"
        ? {
            email: em,
            name: "Priya Shah",
            role: "creator",
            h: "demo",
            cid: "priya",
          }
        : {
            email: em,
            name: "GlowLab",
            role: "brand",
            h: "demo",
          },
    );
  A.cur = em;
  saveA();
  if (r == "brand") S.sb = "A";
  enter(false);
}
function logout() {
  G.h = [];
  G.err = "";
  A.cur = null;
  U = {
    page: "dashboard",
    q: "",
    pf: "All",
    msg: ["", "You are signed out."],
    ed: null,
    res: null,
    anim: true,
  };
  saveA();
  render();
}
// ---- AI assistant (Google Gemini via /api/gemini; the API key stays on the server)
const G = {
  h: [],
  busy: false,
  err: "",
  ch: [],
};
function gCtx() {
  const sum = (c) => {
    const v = cvs(c),
      e = earn(c);
    return {
      name: c.name,
      platform: c.plat,
      niche: c.niche,
      data_source:
        c.src === "youtube"
          ? "live YouTube import (" + String(c.yt?.at || "").slice(0, 10) + ")"
          : c.sample
            ? "sample data"
            : "entered manually",
      followers: c.fol,
      avg_reach: c.reach,
      engagement_ratio: +v.r.toFixed(2),
      creator_value_score: +v.v.toFixed(1),
      engagement_score: +v.e.toFixed(1),
      consistency_score: +v.k.v.toFixed(1),
      review_label: v.a.label,
      review_flags: v.a.f,
      est_per_post_inr: {
        low: Math.round(e.low),
        mid: Math.round(e.mid),
        high: Math.round(e.high),
      },
    };
  };
  try {
    const o = {
      creators: (own() ? [gc(me().cid)] : S.c).map(sum),
    };
    if (!own())
      o.briefs = S.b.map((b) => {
        const m = match(b);
        return {
          ...b,
          eligible_creators: m.ok.map((x) => ({
            creator: x.c.name,
            fit_score: +(+x.sc || 0).toFixed(1),
          })),
          excluded_creators: m.no.map((x) => ({
            creator: x.c.name,
            reasons: x.why,
          })),
        };
      });
    return JSON.stringify(o);
  } catch (e) {
    return "{}";
  }
}
async function gCall() {
  const ctl = new AbortController(),
    tm = setTimeout(() => ctl.abort(), 15000);
  try {
    const r = await fetch("/api/gemini", {
        method: "POST",
        signal: ctl.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: role(),
          context: gCtx(),
          messages: G.h.slice(-6),
        }),
      }),
      j = await r.json().catch(() => ({}));
    if (!r.ok)
      throw new Error(
        j.error ||
          (r.status === 504 || r.status === 502
            ? "The server took too long. Try again or ask a shorter question."
            : r.status === 404
              ? 'The /api/gemini endpoint was not found. Run the site with "vercel dev" or "netlify dev", or deploy it.'
              : "Request failed (" + r.status + ")."),
      );
    if (!j.text) throw new Error("The assistant returned no text. Try again.");
    return j.text;
  } catch (e) {
    throw e.name === "AbortError"
      ? new Error("Request timed out. Try again.")
      : e instanceof TypeError
        ? new Error(
            'Could not reach the server. Run the site with "vercel dev" or "netlify dev", or deploy it, so /api/gemini exists.',
          )
        : e;
  } finally {
    clearTimeout(tm);
  }
}
const gmd = (t) =>
  esc(t)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/^[ \t]*[-*] /gm, "• ");
const gLog = () =>
  (G.h.length
    ? G.h
        .map(
          (m) =>
            `<div class="gm ${m.r === "user" ? "u" : "a"}">${m.r === "user" ? esc(m.t) : gmd(m.t)}</div>`,
        )
        .join("")
    : '<p class="t">Ask about your scores, earnings, brand matches or pitch ideas.</p>') +
  (G.busy ? '<div class="gm a t">Thinking…</div>' : "") +
  (G.err ? `<div class="msg e" role="alert">${esc(G.err)}</div>` : "");
function gPaint() {
  const l = $("#gl");
  if (!l) return;
  l.innerHTML = gLog();
  l.scrollTop = l.scrollHeight;
  const b = $("#gb");
  if (b) b.disabled = G.busy;
}
async function gSend(text) {
  const el = $("#gin");
  text = (typeof text === "string" ? text : el?.value || "")
    .trim()
    .slice(0, 2000);
  if (!text || G.busy) return;
  G.h.push({
    r: "user",
    t: text,
  });
  G.busy = true;
  G.err = "";
  if (el) el.value = "";
  gPaint();
  try {
    G.h.push({
      r: "model",
      t: await gCall(),
    });
  } catch (e) {
    G.h.pop();
    G.err = e.message;
    if ($("#gin")) $("#gin").value = text;
  }
  G.busy = false;
  gPaint();
}
P.assistant = () => {
  G.ch = own()
    ? [
        "Explain my Creator Value Score",
        "How can I improve my engagement?",
        "What should I charge per post?",
        "Give me 3 content ideas for my niche",
      ]
    : [
        "Which creator fits my top brief best, and why?",
        "Compare creators by value for money",
        "Which profiles need a manual review, and why?",
        "How should I split my budget across creators?",
      ];
  return `<h2>AI Assistant</h2><p class="t">Powered by Google Gemini. Answers are generated by the model from the data you can see in WorthIt; check important numbers before acting. Your question and a summary of that data are sent to Google through this site's server.</p>
<div class="card"><div id="gl" class="gl" aria-live="polite">${gLog()}</div>
<div class="gc">${G.ch.map((c, i) => `<button class="b s" onclick="gSend(G.ch[${i}])">${esc(c)}</button>`).join("")}</div>
<div class="gi"><textarea id="gin" rows="2" maxlength="2000" aria-label="Ask the assistant" placeholder="Ask a question (Enter to send, Shift+Enter for a new line)" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();gSend()}"></textarea><button id="gb" class="b" onclick="gSend()">Send</button></div>
<p><button class="b s" onclick="G.h=[];G.err='';gPaint()">Clear chat</button></p></div>`;
};
const NAV = [
  ["dashboard", "Dashboard"],
  ["studio", "Creator Studio"],
  ["earnings", "Earnings Lab"],
  ["match", "Brand Matchmaker"],
  ["pitch", "Pitch Desk"],
  ["assistant", "AI Assistant"],
  ["overview", "About"],
  ["method", "Method & Trust"],
];
function render() {
  const u = me(),
    anim = U.anim;
  U.anim = false;
  $("#app").classList.remove("enter");
  if (!u) {
    $("#nav").innerHTML = "";
    $("#who").innerHTML = "";
    $("#app").innerHTML = P.login();
    document.title = "WorthIt · Sign in";
    play(anim);
    return;
  }
  const nav = NAV.filter((n) => ROLES[u.role].includes(n[0]));
  if (!nav.some((n) => n[0] === U.page)) U.page = "dashboard";
  $("#nav").innerHTML = nav
    .map(
      ([k, l]) =>
        `<button class="${U.page === k ? "on" : ""}" onclick="go('${k}')">${l}</button>`,
    )
    .join("");
  $("#who").innerHTML =
    `<span>${esc(u.name)} · ${u.role}</span><button class="b s" onclick="logout()">Log out</button>`;
  $("#app").innerHTML = P[U.page]();
  document.title = "WorthIt · " + nav.find((n) => n[0] === U.page)[1];
  play(anim);
}
let th0 = null;
try {
  th0 = localStorage.getItem("worthit-theme");
} catch (e) {}
applyTheme(
  th0 ||
    (typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
);
render();
