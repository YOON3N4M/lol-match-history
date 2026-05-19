import type { SummonerDto } from "@/types/riot";
import { riotKrClient } from "./client";

export async function getSummonerByPuuid(puuid: string) {
  return riotKrClient.get<SummonerDto>(`/lol/summoner/v4/summoners/by-puuid/${puuid}`);
}
