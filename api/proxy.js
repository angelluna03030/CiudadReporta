const BACKEND = "https://proyecto-integrador-3-i4cy.onrender.com";

function getBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => resolve(body));
  });
}

export default async function handler(req, res) {
  const path = req.url;

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.end();
    return;
  }

  const headers = { ...req.headers };
  delete headers.host;
  delete headers["x-forwarded-host"];
  headers.origin = "http://localhost:5173";

  const options = {
    method: req.method,
    headers,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    options.body = await getBody(req);
  }

  try {
    const response = await fetch(`${BACKEND}${path}`, options);
    const body = await response.text();

    res.statusCode = response.status;
    for (const [key, value] of response.headers) {
      res.setHeader(key, value);
    }
    res.end(body);
  } catch (error) {
    res.statusCode = 500;
    res.end(error.message);
  }
}
