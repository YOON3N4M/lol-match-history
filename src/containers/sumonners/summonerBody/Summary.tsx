import CircleChart from "@/components/Chart/CircleChart";
import PositionsBar from "@/components/PositionsBar";
import { CHAMPION_ICON_URL } from "@/constants";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { ParticipantInfo } from "@/types/types";
import { cn, getKDAColor, getMostChampionsStats } from "@/utils";
import Image from "next/image";

interface SummaryProps {
  mostPlayChampions: any;
}

export default function Summary({ mostPlayChampions }: SummaryProps) {
  const { isMobile } = useDeviceDetect();
  const flattedArr = mostPlayChampions.flat();
  const winCount = flattedArr.filter(
    (info: ParticipantInfo) => info.win === true
  ).length;
  const loseCount = flattedArr.length - winCount;
  const winRate = Math.round((winCount / flattedArr.length) * 100);

  const totalKillsAvg = Number(
    (
      flattedArr.reduce((sum: any, info: any) => {
        return sum + info.kills;
      }, 0) / flattedArr.length
    ).toFixed(1)
  );
  const totalDeathsAvg = Number(
    (
      flattedArr.reduce((sum: any, info: any) => {
        return sum + info.deaths;
      }, 0) / flattedArr.length
    ).toFixed(1)
  );

  const totalAssistsAvg = Number(
    (
      flattedArr.reduce((sum: any, info: any) => {
        return sum + info.assists;
      }, 0) / flattedArr.length
    ).toFixed(1)
  );

  const kdaAvg = (totalKillsAvg + totalAssistsAvg) / totalDeathsAvg;

  return (
    <div className="flex rounded-b-[4px] bg-white py-[24px] px-[21px] mo:my-sm mo:mx-[10px]">
      {mostPlayChampions.length !== 0 ? (
        <>
          {" "}
          <div>
            <div className="text-xs text-opgg-gray-text">
              {flattedArr.length}전 {winCount}승 {loseCount}패
            </div>
            <div className="mt-sm mo:mt-lg flex">
              <div className="relative size-[88px] flex mo:hidden">
                <div className="absolute mx-auto my-auto text-sm size-full flex items-center justify-center">
                  <strong>{winRate}%</strong>
                </div>
                <div className="size-full">
                  <CircleChart
                    totalGameCount={flattedArr.length}
                    winGameCount={winCount}
                  />
                </div>
              </div>
              <div className="ml-xxl mo:ml-0">
                <div className="text-xs font-semibold gap-xxs flex text-opgg-gray-text">
                  <span>{totalKillsAvg}</span>/
                  <span className="text-opgg-red">{totalDeathsAvg}</span>/
                  <span>{totalAssistsAvg}</span>
                </div>
                <div className="mt-xs font-bold text-xl">
                  {kdaAvg.toFixed(2)}: 1
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-[222px] ml-md flex-col mo:items-center">
            <span className="text-xs text-opgg-gray-text">
              {isMobile
                ? "모스트 승률"
                : `플레이한 챔피언 (최근 ${flattedArr.length}게임)`}
            </span>
            <div className="mt-xs mo:mt-xxs flex flex-col mo:flex-row gap-xs mo:gap-xxs">
              {mostPlayChampions
                .slice(0, 3)
                .map((champion: any, idx: number) => (
                  <RecentMostChapmion key={idx} champion={champion} />
                ))}
            </div>
          </div>
          <div className="flex-1">
            <PositionsBar currentMatchList={flattedArr} />
          </div>
        </>
      ) : (
        <>
          {/* 전적 정보가 없습니다. 전적이 있다면 전적 갱신을 시도 해보세요. */}
        </>
      )}
    </div>
  );
}

interface RecentMostChapmionProps {
  champion: ParticipantInfo[];
}

function RecentMostChapmion({ champion }: RecentMostChapmionProps) {
  const {
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
  } = getMostChampionsStats(champion);

  return (
    <>
      <div className="mo:mt-xs flex items-center mo:flex-col">
        <div className="w-[24px] mo:w-[35px] h-[24px] mo:h-[35px] ">
          <Image
            className="rounded-full"
            src={CHAMPION_ICON_URL(ChampionName)}
            width={35}
            height={35}
            alt={ChampionName}
          />
        </div>

        <div className="flex text-xs gap-xxs ml-xs">
          <span
          // color={
          //   Math.round(winRate) >= 60
          //     ? variable.color.red
          //     : variable.color.gray
          // }
          >
            {Math.round(winRate)}%{" "}
          </span>
          <span
            className="mo:hidden"
            // color={variable.color.gray}
          >
            ({wins}승 {lose}패)
          </span>
          <span className={cn("mo:hidden", getKDAColor(kdaAverage))}>
            {" "}
            {kdaAverage} 평점
          </span>
        </div>
      </div>
    </>
  );
}
