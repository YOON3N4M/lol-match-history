import { BarChart } from "@/components/charts";
import { LanePosition, POSITION_ICON_LIST } from "@/constants/riot";
import { ParticipantDto } from "@/types/riot";

interface FavoritePositionProps {
  totalMatchCount: number;
  groupByPosition: Map<
    "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "UTILITY" | "Invalid",
    ParticipantDto[]
  >;
}

export default function FavoritePosition(props: FavoritePositionProps) {
  const { totalMatchCount, groupByPosition } = props;

  const getPositionCount = (lane: LanePosition) =>
    groupByPosition.get(lane)?.length;

  const getBarHeight = (positionMatchCount: number) =>
    totalMatchCount === 0
      ? 0
      : Math.round((positionMatchCount / totalMatchCount) * 100);

  return (
    <div className="flex justify-evenly">
      {POSITION_ICON_LIST.map(({ position, icon, alt }) => (
        <div
          key={`summary-${position}`}
          className="flex flex-col items-center gap-2"
        >
          <BarChart
            className="h-16 w-4"
            value={getBarHeight(getPositionCount(position) ?? 0)}
          />
          <img width={16} height={16} src={icon} alt={alt} />
        </div>
      ))}
    </div>
  );
}
