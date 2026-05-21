import { RIOT_API_KEY } from "@/lib/env/server";
import { fetchClient } from "@/lib/http/fetchClient";

export const riotKrClient = fetchClient({
  baseUrl: "https://kr.api.riotgames.com",
  getHeaders: () => ({
    "X-Riot-Token": RIOT_API_KEY ?? "",
  }),
});
