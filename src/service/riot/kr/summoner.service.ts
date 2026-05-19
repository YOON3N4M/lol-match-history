import { SummonerDto } from "@/types/riot-dto";
import { riotKrClient } from "./client";

export async function getSummonerByPuuid(puuid: string) {
  return riotKrClient.get<SummonerDto>(`/lol/summoner/v4/summoners/by-puuid/${puuid}`);
}
