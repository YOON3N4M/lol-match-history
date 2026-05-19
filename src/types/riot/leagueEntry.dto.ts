export interface LeagueEntryDto {
  wins: number;
  losses: number;
  rank: string;
  tier: string;
  leaguePoints: number;
  queueType: "RANKED_SOLO_5x5" | "RANKED_FLEX_SR";
}
