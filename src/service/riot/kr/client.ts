import { API_KEY } from "@/constants";
import { fetchClient } from "@/lib/http/fetchClient";

export const riotKrClient = fetchClient({
  baseUrl: "https://kr.api.riotgames.com",
  getHeaders: () => ({
    "X-Riot-Token": API_KEY ?? "",
  }),
});
