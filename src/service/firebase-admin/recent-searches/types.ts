export type RecentSearchRegion = "KR";

export interface RecentSearchSoloRank {
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

export interface RecentSearchUser {
  region: RecentSearchRegion;
  puuid: string;
  gameName: string;
  tagLine: string;
  riotId: string;
  profileIconId: number;
  summonerLevel: number;
  soloRank: RecentSearchSoloRank | null;
  searchedCount: number;
  lastSearchedAt: number;
}

export interface RecentSearchDocument extends RecentSearchUser {
  riotIdKey: string;
  createdAt: number;
  updatedAt: number;
}
