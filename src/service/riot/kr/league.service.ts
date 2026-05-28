import type { LeagueEntryDto } from "@/types/riot";
import {
  createRiotCacheDocumentId,
  getCachedRiotApiData,
} from "@/service/firebase-admin/riot-api-cache.service";
import { riotKrClient } from "./client";

const LEAGUE_CACHE_TTL_MS = 5 * 60 * 1000;

export async function getLeagueEntry(puuid: string) {
  return getCachedRiotApiData<LeagueEntryDto[]>({
    collectionName: "riot_league_cache",
    documentId: createRiotCacheDocumentId("kr", puuid),
    ttlMs: LEAGUE_CACHE_TTL_MS,
    fetcher: () =>
      riotKrClient.get<LeagueEntryDto[]>(
        `/lol/league/v4/entries/by-puuid/${puuid}`,
      ),
  });
}
