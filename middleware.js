const BACKEND = "https://proyecto-integrador-3-i4cy.onrender.com";

export default async function middleware(request) {
  const url = new URL(request.url);

  if (
    url.pathname.startsWith("/auth/") ||
    url.pathname.startsWith("/incidents") ||
    url.pathname.startsWith("/api/")
  ) {
    const headers = new Headers(request.headers);
    headers.set("Origin", "http://localhost:5173");
    headers.set("X-Forwarded-For", "");
    headers.delete("X-Forwarded-For");

    let body = null;
    if (request.body) {
      body = await request.text();
    }

    return fetch(BACKEND + url.pathname + url.search, {
      method: request.method,
      headers,
      body,
    });
  }
}

export const config = {
  matcher: ["/auth/:path*", "/incidents", "/incidents/:path*", "/api/:path*"],
};
