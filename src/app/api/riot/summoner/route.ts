import { NextRequest, NextResponse } from "next/server";

import { getSummonerByPuuid } from "@/service/riot/kr/summoner.service";

export async function GET(request: NextRequest) {
  const puuid = request.nextUrl.searchParams.get("puuid") ?? "";

  if (!puuid) {
    return NextResponse.json({ message: "puuid는 필수 입력 값 입니다." }, { status: 400 });
  }

  try {
    const accountResult = await getSummonerByPuuid(puuid);
    return NextResponse.json(accountResult);
  } catch {
    return NextResponse.json({ message: "500, 인터넷 에러" }, { status: 500 });
  }
}
