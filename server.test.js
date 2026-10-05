const assert = require("node:assert/strict");
const http = require("node:http");
const { test } = require("node:test");

const { handleRequest } = require("./server");

function request(path) {
  const server = http.createServer(handleRequest);

  return new Promise((resolve, reject) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();

      http.get({ host: "127.0.0.1", port, path }, (response) => {
        response.setEncoding("utf8");

        let body = "";
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          server.close((error) => {
            if (error) {
              reject(error);
              return;
            }

            resolve({ response, body });
          });
        });
      }).on("error", reject);
    });

    server.on("error", reject);
  });
}

test("GET /status returns an ok JSON response", async () => {
  const { response, body } = await request("/status");

  assert.equal(response.statusCode, 200);
  assert.equal(response.headers["content-type"], "application/json");
  assert.equal(body, '{"status":"ok"}');
  assert.deepEqual(JSON.parse(body), { status: "ok" });
});

test("GET /health remains unchanged", async () => {
  const { response, body } = await request("/health");

  assert.equal(response.statusCode, 200);
  assert.equal(response.headers["content-type"], "text/plain");
  assert.equal(body, "ok");
});
