const { run } = require("./_gemini");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST")
    return res.status(405).json({ error: "Use POST." });
  let b = req.body;
  if (typeof b === "string") {
    try {
      b = JSON.parse(b);
    } catch (e) {
      b = null;
    }
  }
  const { status, body } = await run(
    b,
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_MODEL,
  );
  res.status(status).json(body);
};
