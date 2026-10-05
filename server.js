const http = require("http");

function handleRequest(req, res) {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("ok");
    return;
  }

  if (req.url === "/status") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
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
}

if (require.main === module) {
  const server = http.createServer(handleRequest);

  server.listen(3000, () => {
    console.log("Facility Sandbox running on port 3000");
  });
}

module.exports = { handleRequest };
