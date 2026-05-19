import { getMatchDetail } from "./matches-detail.service";

export async function getMatchHistoryList(matchIdList: string[]) {
  // 임시 2개만 조회
  const matchDetailList = await Promise.all(matchIdList.slice(0, 2).map((matchId) => getMatchDetail(matchId)));

  return matchDetailList;
}
