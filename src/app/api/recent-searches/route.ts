import { NextRequest, NextResponse } from "next/server";

import { getRecentSearches } from "@/service/firebase-admin/recent-searches.service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? 20);
  const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 50) : 20;

  try {
    const recentSearches = await getRecentSearches(safeLimit);
    return NextResponse.json(recentSearches);
  } catch {
    return NextResponse.json({ message: "최근 검색 유저 조회에 실패했습니다." }, { status: 500 });
  }
}
