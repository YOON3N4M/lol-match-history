import type { SummonerDto } from "@/types/riot";
import {
  createRiotCacheDocumentId,
  getCachedRiotApiData,
  type RiotApiCacheControlOptions,
} from "@/service/firebase-admin/riot-api-cache.service";
import { riotKrClient } from "./client";

const SUMMONER_CACHE_TTL_MS = 10 * 60 * 1000;

export async function getSummonerByPuuid(
  puuid: string,
  options: RiotApiCacheControlOptions = {},
) {
  return getCachedRiotApiData<SummonerDto>({
    collectionName: "riot_summoner_cache",
    documentId: createRiotCacheDocumentId("kr", puuid),
    ttlMs: SUMMONER_CACHE_TTL_MS,
    forceRefresh: options.forceRefresh,
    fetcher: () =>
      riotKrClient.get<SummonerDto>(
        `/lol/summoner/v4/summoners/by-puuid/${puuid}`,
        options.forceRefresh ? { cache: "no-store" } : undefined,
      ),
  });
}
