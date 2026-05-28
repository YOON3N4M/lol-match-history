import type { RiotAccountDto } from "@/types/riot";
import {
  createRiotCacheDocumentId,
  getCachedRiotApiData,
} from "@/service/firebase-admin/riot-api-cache.service";
import { riotAsiaClient } from "./client";

const ACCOUNT_CACHE_TTL_MS = 60 * 60 * 1000;

export async function getAccountByRiotId(name: string, tagLine: string) {
  return getCachedRiotApiData<RiotAccountDto>({
    collectionName: "riot_account_cache",
    documentId: createRiotCacheDocumentId("asia", name, tagLine),
    ttlMs: ACCOUNT_CACHE_TTL_MS,
    fetcher: () =>
      riotAsiaClient.get<RiotAccountDto>(
        `/riot/account/v1/accounts/by-riot-id/${name}/${tagLine}`,
      ),
  });
}
