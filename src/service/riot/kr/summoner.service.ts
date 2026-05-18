import { SummonerDto } from "@/types/riot-dto";
import { riotKrClient } from "./client";
import { API_KEY } from "@/constants";

export async function getSummonerByPuuid(puuid: string) {
  return riotKrClient.get<SummonerDto>(`/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`);
}
