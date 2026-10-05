const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("ok");
    return;
  }

  res.writeHead(200, { "content-type": "text/html" });
  res.end(`
    <html>
      <body>
        <h1>Facility Sandbox</h1>
        <p>Small app for testing Facility's AI SDLC.</p>
      </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log("Facility Sandbox running on port 3000");
});
