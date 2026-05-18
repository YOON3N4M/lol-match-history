import { NextRequest, NextResponse } from "next/server";

import { getAccountByRiotId } from "@/service/riot/asia/account.service";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") ?? "";
  const tagLine = request.nextUrl.searchParams.get("tagLine") ?? "";

  if (!name || !tagLine) {
    return NextResponse.json({ message: "이름과 태그라인은 필수 입력 값 입니다." }, { status: 400 });
  }

  try {
    const accountResult = await getAccountByRiotId(name, tagLine);
    return NextResponse.json(accountResult);
  } catch {
    return NextResponse.json({ message: "500, 인터넷 에러" }, { status: 500 });
  }
}
