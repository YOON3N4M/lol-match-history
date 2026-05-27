import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";
import type { LeagueEntryDto, RiotAccountDto, SummonerDto } from "@/types/riot";
import type { RecentSearchDocument, RecentSearchSoloRank, RecentSearchUser } from "./recent-searches/types";

const COLLECTION_NAME = "recent_searches";
const REGION = "KR";

export async function getRecentSearches(limitCount = 20): Promise<RecentSearchUser[]> {
  const snapshot = await getAdminDb()
    .collection(COLLECTION_NAME)
    .orderBy("lastSearchedAt", "desc")
    .limit(limitCount)
    .get();

  return snapshot.docs
    .map((doc) => toRecentSearchUser(doc.data() as Partial<RecentSearchDocument>))
    .filter((user): user is RecentSearchUser => user !== null);
}

export async function upsertRecentSearch(params: {
  account: RiotAccountDto;
  summoner: SummonerDto;
  leagueEntry: LeagueEntryDto[];
}) {
  const { account, summoner, leagueEntry } = params;
  const db = getAdminDb();
  const now = Date.now();
  const docRef = db.collection(COLLECTION_NAME).doc(`${REGION}:${account.puuid}`);
  const riotId = `${account.gameName}#${account.tagLine}`;

  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(docRef);
    const currentData = snapshot.data() as Partial<RecentSearchDocument> | undefined;

    transaction.set(
      docRef,
      {
        region: REGION,
        puuid: account.puuid,
        gameName: account.gameName,
        tagLine: account.tagLine,
        riotId,
        riotIdKey: normalizeRiotIdKey(riotId),
        profileIconId: summoner.profileIconId,
        summonerLevel: summoner.summonerLevel,
        soloRank: createSoloRank(leagueEntry),
        searchedCount: FieldValue.increment(1),
        lastSearchedAt: now,
        createdAt: currentData?.createdAt ?? now,
        updatedAt: now,
      },
      { merge: true },
    );
  });
}

function createSoloRank(leagueEntry: LeagueEntryDto[]): RecentSearchSoloRank | null {
  const soloRank = leagueEntry.find((league) => league.queueType === "RANKED_SOLO_5x5");

  if (!soloRank) {
    return null;
  }

  return {
    tier: soloRank.tier,
    rank: soloRank.rank,
    leaguePoints: soloRank.leaguePoints,
    wins: soloRank.wins,
    losses: soloRank.losses,
  };
}

function toRecentSearchUser(data: Partial<RecentSearchDocument>): RecentSearchUser | null {
  if (
    data.region !== REGION ||
    !data.puuid ||
    !data.gameName ||
    !data.tagLine ||
    !data.riotId ||
    typeof data.profileIconId !== "number" ||
    typeof data.summonerLevel !== "number" ||
    typeof data.lastSearchedAt !== "number"
  ) {
    return null;
  }

  return {
    region: data.region,
    puuid: data.puuid,
    gameName: data.gameName,
    tagLine: data.tagLine,
    riotId: data.riotId,
    profileIconId: data.profileIconId,
    summonerLevel: data.summonerLevel,
    soloRank: data.soloRank ?? null,
    searchedCount: data.searchedCount ?? 0,
    lastSearchedAt: data.lastSearchedAt,
  };
}

function normalizeRiotIdKey(riotId: string) {
  return riotId.replace(/\s/g, "").toLowerCase();
}
