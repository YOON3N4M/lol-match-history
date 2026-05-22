import { MatchDto } from "@/types/riot";
import MatchDetailItem from "./MatchDetailItem";

interface MatchDetailWidgetProps {
  puuid: string;
  matchDetailList: MatchDto[];
}

export default function MatchDetailWidget(props: MatchDetailWidgetProps) {
  const { puuid, matchDetailList } = props;
  return (
    <div className="space-y-2">
      {matchDetailList.map((match) => (
        <MatchDetailItem puuid={puuid} match={match} />
      ))}
    </div>
  );
}
