import { variable } from "@/constants/temp";
import { MatchDto } from "@/types/riot";
import { ParticipantDto } from "@/types/riot/participant.dto";

/**
 * 승률을 반환
 */
export function getWinRate(wins: number, loses: number) {
  return ((wins / (wins + loses)) * 100).toFixed(0);
}

/**
 * 팀 전체 킬 대비 킬 관여율을 반환함
 *
 */
export function getKillParticipationRate(teamKills: number, targetKills: number, targetAssists: number) {
  if (teamKills === 0) {
    return 0;
  }

  return Math.round(((targetKills + targetAssists) / teamKills) * 100);
}

/**
 *
 * @param kills
 * @param deaths
 * @param assists
 * @returns
 * UI용 KDA를 문자열로 반환
 * Perfect
 * 0.00
 * number
 *
 */
export function getKDA(kills: number, deaths: number, assists: number) {
  if (kills + assists > 0 && deaths === 0) {
    return "Perfect";
  } else if (kills + deaths + assists === 0) {
    return "0.00";
  } else {
    return ((kills + assists) / deaths).toFixed(2).toString();
  }
}

/**
 * UI 표시용 KDA 색상 값을 반환
 */
export function getKDAColor(kda: string | number): string {
  if (kda === "Perfect") {
    return variable.color.orange;
  }

  const numericKda = Number(kda);

  if (numericKda >= 5) {
    return variable.color.orange;
  } else if (4 <= numericKda && numericKda < 5) {
    return variable.color.sky;
  } else if (3 <= numericKda && numericKda < 4) {
    return variable.color.mint;
  }

  return variable.color.gray;
}

/**
 *
 * @param neutralMinionsKills
 * @param totalMinionsKills
 * @param gameDuration
 * @returns
 * UI용 CS를 문자열로 반환
 */
export function getCS(neutralMinionsKills: number, totalMinionsKills: number, gameDuration?: number) {
  let csPerMinute = null;

  if (gameDuration) {
    csPerMinute = ((neutralMinionsKills + totalMinionsKills) / (gameDuration / 60)).toFixed(1);
  }

  const result = {
    cs: neutralMinionsKills + totalMinionsKills,
    csPerMinute,
  };

  return result;
}

// 이 아래는 검토후 정리 필요
export function getMostChampions(matchHistory: MatchDto[] | null, puuid: string) {
  if (!matchHistory) return;
  const filtered = matchHistory?.map(
    (game) => game?.info.participants.filter((player: any) => player.puuid === puuid)[0],
  );

  const removeUndefined: any = filtered?.filter((item) => item !== undefined);
  const most = removeUndefined.reduce((acc: any, obj: any) => {
    const key = obj.championName;
    acc[key] = (acc[key] || []).concat(obj);
    return acc;
  }, {});
  const mostList = Object.values(most).sort((a: any, b: any) => b.length - a.length);

  return mostList;
}

export function getMostChampionsStats(championsStats: ParticipantDto[]) {
  const ChampionName: string = championsStats[0].championName;
  const gameQty = championsStats.length;
  const totalKills = championsStats.reduce((sum, { kills }) => sum + kills, 0);
  const totalDeaths = championsStats.reduce((sum, { deaths }) => sum + deaths, 0);
  const totalAssists = championsStats.reduce((sum, { assists }) => sum + assists, 0);
  const totalMobKills = championsStats.reduce((sum, { neutralMinionsKilled }) => sum + neutralMinionsKilled, 0);
  const totalMinionKills = championsStats.reduce((sum, { totalMinionsKilled }) => sum + totalMinionsKilled, 0);
  const TotalCs = totalMobKills + totalMinionKills;
  const wins = championsStats.filter((champion) => champion.win === true).length;
  const lose = championsStats.filter((champion) => champion.win === false).length;
  //평균
  const csAverage = (TotalCs / gameQty).toFixed(1);
  const kdaAverage = getKDA(totalKills, totalDeaths, totalAssists);
  const winRate = Math.round((wins / gameQty) * 100);
  const kdaKills = (totalKills / gameQty).toFixed(1);
  const kdaDeaths = (totalDeaths / gameQty).toFixed(1);
  const kdaAssists = (totalAssists / gameQty).toFixed(1);
  return {
    ChampionName,
    csAverage,
    kdaAverage,
    winRate,
    kdaKills,
    kdaDeaths,
    kdaAssists,
    gameQty,
    wins,
    lose,
  };
}
