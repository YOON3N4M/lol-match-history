import { CHAMPION_ICON_URL } from "@/constants/riot";
import { MostChampionStats } from "@/types/riot";
import { getKdaTextColor } from "@/utils/riot";

interface MostThreeListProps {
  mostChampionStatsList: MostChampionStats[];
}

function getWinRateTextColor(winRate: number) {
  if (winRate >= 60) return "text-red-600";
  return "text-gray-500";
}

export default function MostThreeList(props: MostThreeListProps) {
  const { mostChampionStatsList } = props;
  return (
    <div className="flex flex-col gap-2">
      {mostChampionStatsList.map((_champion) => (
        <div
          key={`Summary-most-champion-${_champion.championName}`}
          className="flex items-center gap-2 text-[11px]"
        >
          <div className="size-6 overflow-hidden rounded-full">
            <img
              width={32}
              height={32}
              className="size-6 scale-[115%] rounded-full"
              src={CHAMPION_ICON_URL(_champion.championName)}
              alt={_champion.championName}
            />
          </div>
          <div className="flex items-center gap-1">
            <span className={getWinRateTextColor(_champion.winRate)}>
              {_champion.winRate}%
            </span>
            <span className="text-gray-400">{`(${_champion.winCount}승 / ${_champion.loseCount}패)`}</span>
            <span
              className={getKdaTextColor(_champion.kdaAverage)}
            >{`${_champion.kdaAverage}:1 평점`}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
