import { MatchDto } from "@/types/riot-dto";
import { riotAsiaClient } from "./client";

export async function getMatchDetail(matchId: string) {
  return riotAsiaClient.get<MatchDto>(`/lol/match/v5/matches/${matchId}`);
}
