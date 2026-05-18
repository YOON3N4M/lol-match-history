import { API_KEY } from "..";

export const SUMMONER_INFO_URL = (nickname: string) => {
  return `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${API_KEY}`;
};

export const SUMMONER_BY_PUUID_ID = (puuid: string) => {
  return `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`;
};
export const LEAGUE_INFO_URL = (id: string) => {
  return `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`;
};
export const MATCH_ID_URL = (puuid: string, qty: number) => {
  return `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${qty}&api_key=${API_KEY}`;
};

export const MATCH_INFO_URL = (id: string) => {
  return `https://asia.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${API_KEY}`;
};

export const INGAME_INFO_URL = (summonerId: string) => {
  return `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${API_KEY}`;
};

export const ACCOUNT_BY_RIOT_ID_URL = (name: string, tag: string) => {
  return `/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${API_KEY}`;
};
