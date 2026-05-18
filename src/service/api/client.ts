import { fetchClient } from "@/lib/http/fetchClient";
import { RiotAccountDto } from "@/types/riot-dto";

const apiClient = fetchClient({});

export function fetchRiotAccount(name: string, tagLine: string) {
  return apiClient.get<RiotAccountDto>("/api/riot/account", {
    params: {
      name,
      tagLine,
    },
  });
}
