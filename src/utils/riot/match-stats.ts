import type { MatchDto, ParticipantDto } from "@/types/riot";
import { roundTo } from "../math";

const COMMA_NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

/**
 * 숫자에 천 단위 콤마를 붙여 UI 표시용 문자열로 반환
 */
export function formatNumberWithComma(value: number) {
  return COMMA_NUMBER_FORMATTER.format(value);
}

/**
 * 승률을 반환
 */
export function getWinRate(wins: number, loses: number) {
  return Math.round((wins / (wins + loses)) * 100);
}

/**
 * 팀 전체 킬 대비 킬 관여율을 반환함
 *
 */
export function getKillParticipationRate(
  teamKills: number,
  targetKills: number,
  targetAssists: number,
) {
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
 *
 * kda를 계산하여 숫자로 반환
 *
 */
export function getKDA(kills: number, deaths: number, assists: number): number {
  /**
   * Perfect
   */
  if (kills + assists > 0 && deaths === 0) {
    return -1;
    /**
     * 0.00
     */
  } else if (kills + deaths + assists === 0) {
    return 0;
  } else {
    return roundTo((kills + assists) / deaths, 2);
  }
}

/**
 * 숫자 kda를 ui 문자로 반환
 */
export function getKDADisplay(kda: number) {
  if (kda < 0) return "Perfect";
  if (kda == 0) return "0.00";
  if (kda > 0) return `${kda}:1`;
}

export function getKdaTextColor(kda: number) {
  if (kda < 0 || kda >= 5) return "text-orange-500"; // Perfect 포함
  if (kda >= 4) return "text-main-500";
  if (kda >= 3) return "text-teal-500";

  return "text-gray-600";
}

/**
 *
 * @param neutralMinionsKills
 * @param totalMinionsKills
 * @param gameDuration
 * @returns
 * UI용 CS를 문자열로 반환
 */
export function getCS(
  neutralMinionsKills: number,
  totalMinionsKills: number,
  gameDuration?: number,
) {
  let csPerMinute = null;

  if (gameDuration) {
    csPerMinute = (
      (neutralMinionsKills + totalMinionsKills) /
      (gameDuration / 60)
    ).toFixed(1);
  }

  const result = {
    cs: neutralMinionsKills + totalMinionsKills,
    csPerMinute,
  };

  return result;
}

// 이 아래는 검토후 정리 필요
export function getMostChampions(
  matchHistory: MatchDto[] | null,
  puuid: string,
) {
  if (!matchHistory) return;
  const filtered = matchHistory?.map(
    (game) =>
      game?.info.participants.filter(
        (player: any) => player.puuid === puuid,
      )[0],
  );

  const removeUndefined: any = filtered?.filter((item) => item !== undefined);
  const most = removeUndefined.reduce((acc: any, obj: any) => {
    const key = obj.championName;
    acc[key] = (acc[key] || []).concat(obj);
    return acc;
  }, {});
  const mostList = Object.values(most).sort(
    (a: any, b: any) => b.length - a.length,
  );

  return mostList;
}

export function getMostChampionsStats(championsStats: ParticipantDto[]) {
  const ChampionName: string = championsStats[0].championName;
  const gameQty = championsStats.length;
  const totalKills = championsStats.reduce((sum, { kills }) => sum + kills, 0);
  const totalDeaths = championsStats.reduce(
    (sum, { deaths }) => sum + deaths,
    0,
  );
  const totalAssists = championsStats.reduce(
    (sum, { assists }) => sum + assists,
    0,
  );
  const totalMobKills = championsStats.reduce(
    (sum, { neutralMinionsKilled }) => sum + neutralMinionsKilled,
    0,
  );
  const totalMinionKills = championsStats.reduce(
    (sum, { totalMinionsKilled }) => sum + totalMinionsKilled,
    0,
  );
  const TotalCs = totalMobKills + totalMinionKills;
  const wins = championsStats.filter(
    (champion) => champion.win === true,
  ).length;
  const lose = championsStats.filter(
    (champion) => champion.win === false,
  ).length;
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
