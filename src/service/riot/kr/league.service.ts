import { LeagueEntryDto } from "@/types/riot-dto";
import { riotKrClient } from "./client";

export async function getLeagueEntry(puuid: string) {
  return riotKrClient.get<LeagueEntryDto[]>(`/lol/league/v4/entries/by-puuid/${puuid}`);
}
