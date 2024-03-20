export default function handler(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  const data = { message: "API response" };
  res.status(200).json(data);
  const intervalId = setInterval(() => {
    const data = `Current time is: ${new Date().toLocaleTimeString()}`;
    res.write(`data: ${data}\n\n`);
  }, 1000);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
}
