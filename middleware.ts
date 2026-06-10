const BACKEND = "https://proyecto-integrador-3-i4cy.onrender.com";

export default function middleware(request: Request) {
  const url = new URL(request.url);

  if (
    url.pathname.startsWith("/auth/") ||
    url.pathname.startsWith("/incidents") ||
    url.pathname.startsWith("/api/")
  ) {
    const headers = new Headers(request.headers);
    headers.set("Origin", "http://localhost:5173");

    return fetch(`${BACKEND}${url.pathname}${url.search}`, {
      method: request.method,
      headers,
      body: request.body,
    });
  }
}

export const config = {
  matcher: ["/auth/:path*", "/incidents/:path*", "/incidents", "/api/:path*"],
};
