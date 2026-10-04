const http = require("http");

http.createServer((req, res) => {
  res.setHeader("X-Backend", "B");

  if (req.url === "/api/status") {
    res.setHeader("Content-Type", "application/json");
    res.end('{"backend":"B","status":"ok"}');
    return;
  }

  if (req.url === "/") {
    const etag = '"backend-b-v1"';

    res.setHeader("Cache-Control", "public, max-age=60");
    res.setHeader("ETag", etag);

    if (req.headers["if-none-match"] === etag) {
      res.statusCode = 304;
      res.end();
      return;
    }

    res.end("Backend B is running");
    return;
  }

  res.end("Backend B is running");
}).listen(3002, "0.0.0.0", () => {
  console.log("Backend B running on port 3002");
});