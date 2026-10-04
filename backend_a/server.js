const http = require("http");

http.createServer((req, res) => {
  res.setHeader("X-Backend", "A");

  if (req.url === "/api/status") {
    res.setHeader("Content-Type", "application/json");
    res.end('{"backend":"A","status":"ok"}');
    return;
  }

  if (req.url === "/") {
    const etag = '"backend-a-v1"';

    res.setHeader("Cache-Control", "public, max-age=60");
    res.setHeader("ETag", etag);

    if (req.headers["if-none-match"] === etag) {
      res.statusCode = 304;
      res.end();
      return;
    }

    res.end("Backend A is running");
    return;
  }

  res.end("Backend A is running");
}).listen(3001, "0.0.0.0", () => {
  console.log("Backend A running on port 3001");
});