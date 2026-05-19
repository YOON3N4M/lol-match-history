import type { MatchDto } from "@/types/riot";
import { riotAsiaClient } from "./client";

export async function getMatchDetail(matchId: string) {
  return riotAsiaClient.get<MatchDto>(`/lol/match/v5/matches/${matchId}`);
}
