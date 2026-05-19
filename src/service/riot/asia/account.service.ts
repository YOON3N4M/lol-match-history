import type { RiotAccountDto } from "@/types/riot";
import { riotAsiaClient } from "./client";

export async function getAccountByRiotId(name: string, tagLine: string) {
  return riotAsiaClient.get<RiotAccountDto>(`/riot/account/v1/accounts/by-riot-id/${name}/${tagLine}`);
}
