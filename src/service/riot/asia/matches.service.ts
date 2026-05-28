import {
  createRiotCacheDocumentId,
  getCachedRiotApiData,
} from "@/service/firebase-admin/riot-api-cache.service";
import { riotAsiaClient } from "./client";

const MATCH_IDS_CACHE_TTL_MS = 2 * 60 * 1000;

export async function getMatches(puuid: string, qty: number = 20) {
  return getCachedRiotApiData<string[]>({
    collectionName: "riot_match_ids_cache",
    documentId: createRiotCacheDocumentId("asia", puuid, qty),
    ttlMs: MATCH_IDS_CACHE_TTL_MS,
    fetcher: () =>
      riotAsiaClient.get<string[]>(
        `/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${qty}`,
      ),
  });
}
