import type { MatchDto } from "@/types/riot";
import {
  createRiotCacheDocumentId,
  getCachedRiotApiData,
} from "@/service/firebase-admin/riot-api-cache.service";
import { riotAsiaClient } from "./client";

export async function getMatchDetail(matchId: string) {
  return getCachedRiotApiData<MatchDto>({
    collectionName: "riot_match_detail_cache",
    documentId: createRiotCacheDocumentId("asia", matchId),
    ttlMs: null,
    fetcher: () =>
      riotAsiaClient.get<MatchDto>(`/lol/match/v5/matches/${matchId}`, {
        cache: "force-cache",
        next: {
          revalidate: false,
          tags: [`riot-match:${matchId}`],
        },
      }),
  });
}
