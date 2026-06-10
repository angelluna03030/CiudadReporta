const BACKEND = "https://proyecto-integrador-3-i4cy.onrender.com";

export default async function handler(req, res) {
  const path = req.url;

  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    const k = key.toLowerCase();
    if (k !== "host" && k !== "x-forwarded-host") {
      headers[k] = value;
    }
  }
  headers["origin"] = "http://localhost:5173";

  const options = {
    method: req.method,
    headers,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    options.body = await req.text();
  }

  try {
    const response = await fetch(`${BACKEND}${path}`, options);
    const body = await response.text();

    res.status(response.status);
    for (const [key, value] of response.headers) {
      res.setHeader(key, value);
    }
    res.send(body);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
