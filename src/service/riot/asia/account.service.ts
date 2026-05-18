import { RiotAccountDto } from "@/types/riot-dto";
import { riotAsiaClient } from "./client";

export async function getAccountByRiotId(name: string, tagLine: string) {
  return riotAsiaClient.get<RiotAccountDto>(`/riot/account/v1/accounts/by-riot-id/${name}/${tagLine}`);
}
