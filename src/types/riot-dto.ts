export interface RiotAccountDto {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface SummonerDto {
  profileIconId: number;
  // long이 뭐여
  revisionDate: any;
  puuid: string;
  // long
  summonerLevel: any;
}

export interface LeagueEntryDto {
  wins: number;
  losses: number;
  rank: string;
  tier: string;
  leaguePoints: number;
  queueType: "RANKED_SOLO_5x5" | "RANKED_FLEX_SR";
}

export interface MatchDto {}
