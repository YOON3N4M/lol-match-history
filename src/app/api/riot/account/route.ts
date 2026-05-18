import { NextRequest, NextResponse } from "next/server";

import { riotApi } from "@/service/riot";
import type { RiotId } from "@/types/types";

export async function GET(request: NextRequest) {
  const riotId: RiotId = {
    name: request.nextUrl.searchParams.get("name") ?? "",
    tag: request.nextUrl.searchParams.get("tag") ?? "",
  };

  if (!riotId.name || !riotId.tag) {
    return NextResponse.json(
      { message: "name and tag query parameters are required" },
      { status: 400 }
    );
  }

  try {
    const accountResult = await riotApi.getAccountByRiotId(riotId);
    return NextResponse.json(accountResult);
  } catch {
    return NextResponse.json({ message: "500, 등록 실패" }, { status: 500 });
  }
}
