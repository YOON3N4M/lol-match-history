import { API_KEY } from "@/constants";
import { fetchClient } from "@/lib/http/fetchClient";

export const riotAsiaClient = fetchClient({
  baseUrl: "https://asia.api.riotgames.com",
  getHeaders: () => ({
    "X-Riot-Token": API_KEY ?? "",
  }),
});
