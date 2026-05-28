import type { SummonerDto } from "@/types/riot";
import {
  createRiotCacheDocumentId,
  getCachedRiotApiData,
} from "@/service/firebase-admin/riot-api-cache.service";
import { riotKrClient } from "./client";

const SUMMONER_CACHE_TTL_MS = 10 * 60 * 1000;

export async function getSummonerByPuuid(puuid: string) {
  return getCachedRiotApiData<SummonerDto>({
    collectionName: "riot_summoner_cache",
    documentId: createRiotCacheDocumentId("kr", puuid),
    ttlMs: SUMMONER_CACHE_TTL_MS,
    fetcher: () =>
      riotKrClient.get<SummonerDto>(
        `/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      ),
  });
}
