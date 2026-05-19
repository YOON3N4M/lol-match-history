import { fetchClient } from "@/lib/http/fetchClient";
import type { RiotAccountDto } from "@/types/riot";

const apiClient = fetchClient({});

export function fetchRiotAccount(name: string, tagLine: string) {
  return apiClient.get<RiotAccountDto>("/api/riot/account", {
    params: {
      name,
      tagLine,
    },
  });
}
