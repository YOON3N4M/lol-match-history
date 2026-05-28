import { NextRequest, NextResponse } from "next/server";

import { ApiError } from "@/lib/http/ApiError";
import { upsertRecentSearch } from "@/service/firebase-admin/recent-searches.service";
import {
  claimRiotRefresh,
  completeRiotRefresh,
  releaseRiotRefreshClaim,
  RiotRefreshCooldownError,
} from "@/service/firebase-admin/riot-refresh-cooldown.service";
import { getAccountByRiotId } from "@/service/riot/asia/account.service";
import { getMatchHistoryList } from "@/service/riot/asia/matches-history.service";
import { getMatches } from "@/service/riot/asia/matches.service";
import { getLeagueEntry } from "@/service/riot/kr/league.service";
import { getSummonerByPuuid } from "@/service/riot/kr/summoner.service";

const REFRESH_MATCH_COUNT = 20;

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const refreshBody = await parseRefreshBody(request);

  if (!refreshBody) {
    return NextResponse.json(
      { message: "소환사 이름과 태그라인은 필수 입력 값입니다." },
      { status: 400 },
    );
  }

  let claimedPuuid: string | null = null;

  try {
    const account = await getAccountByRiotId(
      refreshBody.gameName,
      refreshBody.tagLine,
    );
    const { puuid } = account;

    await claimRiotRefresh(puuid);
    claimedPuuid = puuid;

    const [summoner, leagueEntry, matchIdList] = await Promise.all([
      getSummonerByPuuid(puuid, { forceRefresh: true }),
      getLeagueEntry(puuid, { forceRefresh: true }),
      getMatches(puuid, REFRESH_MATCH_COUNT, { forceRefresh: true }),
    ]);

    const matchDetailList = await getMatchHistoryList(matchIdList, {
      forceRefresh: true,
    });

    try {
      await upsertRecentSearch({
        account,
        summoner,
        leagueEntry,
      });
    } catch (error) {
      console.error("최근 검색 유저 갱신에 실패했습니다.", error);
    }

    const refreshCooldown = await completeRiotRefresh(puuid);

    return NextResponse.json({
      refreshedAt: Date.now(),
      matchCount: matchDetailList.length,
      cooldownExpiresAt: refreshCooldown.cooldownExpiresAt,
      retryAfterMs: refreshCooldown.retryAfterMs,
    });
  } catch (error) {
    if (claimedPuuid && !(error instanceof RiotRefreshCooldownError)) {
      await releaseRiotRefreshClaim(claimedPuuid).catch((releaseError) => {
        console.error("전적 갱신 잠금 해제에 실패했습니다.", releaseError);
      });
    }

    if (error instanceof RiotRefreshCooldownError) {
      return NextResponse.json(
        {
          message: error.message,
          cooldownExpiresAt: error.cooldownExpiresAt,
          retryAfterMs: error.retryAfterMs,
        },
        {
          status: error.status,
          headers: {
            "Retry-After": String(Math.ceil(error.retryAfterMs / 1000)),
          },
        },
      );
    }

    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status },
      );
    }

    console.error("전적 갱신에 실패했습니다.", error);

    return NextResponse.json(
      { message: "전적 갱신에 실패했습니다." },
      { status: 500 },
    );
  }
}

async function parseRefreshBody(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;

    if (!isRecord(body)) {
      return null;
    }

    const gameName = body.gameName;
    const tagLine = body.tagLine;

    if (typeof gameName !== "string" || typeof tagLine !== "string") {
      return null;
    }

    const trimmedGameName = gameName.trim();
    const trimmedTagLine = tagLine.trim();

    if (!trimmedGameName || !trimmedTagLine) {
      return null;
    }

    return {
      gameName: trimmedGameName,
      tagLine: trimmedTagLine,
    };
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
