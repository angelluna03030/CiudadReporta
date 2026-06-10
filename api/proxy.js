const BACKEND = "https://proyecto-integrador-3-i4cy.onrender.com";

function getBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => resolve(body));
  });
}

export default async function handler(req, res) {
  try {
    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.end();
      return;
    }

    const allowedHeaders = ["content-type", "authorization", "accept", "user-agent"];
    const headers = {};
    for (const key of allowedHeaders) {
      if (req.headers[key]) {
        headers[key] = req.headers[key];
      }
    }
    headers["origin"] = "http://localhost:5173";

    const body = req.method !== "GET" && req.method !== "HEAD"
      ? await getBody(req)
      : null;

    const response = await fetch(`${BACKEND}${req.url}`, {
      method: req.method,
      headers,
      body,
    });

    const responseBody = await response.text();
    res.statusCode = response.status;
    res.setHeader("access-control-allow-origin", "*");
    res.end(responseBody);
  } catch (error) {
    res.statusCode = 500;
    res.end(error.message || "Internal server error");
  }
}
