// Netlify function: same endpoint via the redirect in netlify.toml (/api/gemini)
const { run } = require('../../api/_gemini');

exports.handler = async event => {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Use POST.' }) };
  let b = null;
  try {
    b = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : event.body || '');
  } catch (e) {}
  const { status, body } = await run(b, process.env.GEMINI_API_KEY, process.env.GEMINI_MODEL);
  return { statusCode: status, headers, body: JSON.stringify(body) };
};
