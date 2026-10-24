const { run } = require("../../api/_core");

exports.handler = async (event) => {
  const { status, body } = await run(
    event.queryStringParameters && event.queryStringParameters.handle,
    process.env.YOUTUBE_API_KEY,
  );
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": status === 200 ? "public, max-age=300" : "no-store",
    },
    body: JSON.stringify(body),
  };
};
