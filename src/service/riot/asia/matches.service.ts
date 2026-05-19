import { riotAsiaClient } from "./client";

export async function getMatches(puuid: string, qty: number = 20) {
  return riotAsiaClient.get<string[]>(`/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${qty}`);
}
