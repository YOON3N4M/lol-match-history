export interface LeagueEntryDto {
  wins: number;
  losses: number;
  rank: string;
  tier:
    | "IRON"
    | "BRONZE"
    | "SILVER"
    | '"GOLD"'
    | "PLATINUM"
    | 'EMERALD | "DIAMOND'
    | "MASTER"
    | "GRANDMASTER"
    | "CHALLENGER";
  leaguePoints: number;
  queueType: "RANKED_SOLO_5x5" | "RANKED_FLEX_SR";
}
