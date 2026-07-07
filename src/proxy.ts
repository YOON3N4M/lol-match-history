export const config = {
  matcher: ["/summoners/:path*", "/api/riot/:path*"],
};

export function proxy(request: Request) {
  if (request.headers.get("user-agent")?.includes("GoogleOther")) {
    return new Response("Forbidden", { status: 403 });
  }
}
