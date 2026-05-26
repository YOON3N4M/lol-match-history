import { MostChampionStats, ParticipantDto } from "@/types/riot";
import { groupByToMap } from "../group-by";
import { getKDA, getWinRate } from "./match-stats";

export function createMostChampionStats(participantList: ParticipantDto[]): MostChampionStats[] {
  const groupedByChampion = groupByToMap(participantList, (participant) => participant.championId);

  return [...groupedByChampion.entries()]
    .map(([championId, participants]) => {
      const totalCount = participants.length;
      const totalKills = participants.reduce((sum, participant) => sum + participant.kills, 0);
      const totalDeaths = participants.reduce((sum, participant) => sum + participant.deaths, 0);
      const totalAssists = participants.reduce((sum, participant) => sum + participant.assists, 0);
      const winCount = participants.filter((participant) => participant.win).length;
      const loseCount = totalCount - winCount;

      return {
        championId,
        championName: participants[0].championName,
        killAverage: totalKills / totalCount,
        deathAverage: totalDeaths / totalCount,
        assistAverage: totalAssists / totalCount,
        kdaAverage: getKDA(totalKills, totalDeaths, totalAssists),
        winCount,
        loseCount,
        winRate: getWinRate(winCount, loseCount),
      };
    })
    .sort((a, b) => {
      const aTotalCount = a.winCount + a.loseCount;
      const bTotalCount = b.winCount + b.loseCount;

      return bTotalCount - aTotalCount;
    });
}
