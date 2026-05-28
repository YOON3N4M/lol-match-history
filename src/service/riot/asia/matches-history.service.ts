import type { RiotApiCacheControlOptions } from "@/service/firebase-admin/riot-api-cache.service";
import { getMatchDetail } from "./matches-detail.service";

const MAX_MATCH_COUNT = 20;
const BATCH_SIZE = 2;

export async function getMatchHistoryList(
  matchIdList: string[],
  options: RiotApiCacheControlOptions = {},
) {
  const targetMatchIds = matchIdList.slice(0, MAX_MATCH_COUNT);
  const matchDetailList = [];

  for (let i = 0; i < targetMatchIds.length; i += BATCH_SIZE) {
    const batch = targetMatchIds.slice(i, i + BATCH_SIZE);

    const batchResult = await Promise.all(
      batch.map((matchId) => getMatchDetail(matchId, options)),
    );

    matchDetailList.push(...batchResult);
  }

  return matchDetailList;
}
