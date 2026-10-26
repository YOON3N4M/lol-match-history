export const config = {
  matcher: ["/summoners/:path*", "/api/riot/:path*"],
};

// 소환사 페이지는 참여자 링크로 서로 무한히 연결되어 있어 크롤러가 들어오면 SSR 호출이 끝없이 늘어난다.
// ponytail: UA 기반 차단, UA를 위장한 봇은 Vercel Firewall Bot Protection으로 막기
const BOT_UA = /bot|crawl|spider|slurp|GoogleOther|facebookexternalhit|meta-external|headless|python|curl|wget|go-http|axios|node-fetch|scrapy/i;

export function proxy(request: Request) {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (!userAgent || BOT_UA.test(userAgent)) {
    return new Response("Forbidden", { status: 403 });
  }
}
