import { getMatchHistoryList } from "@/service/riot/asia/matches-history.service";
import MatchDetailWidget from "./MatchDetailWidget";
import SummaryWidget from "./SummaryWidget";

interface MatchHistorySectionProps {
  searchedParticipantPuuid: string;
  matchIdListPromise: Promise<string[]>;
}

/**
 * fetch streaming
 */
export default async function MatchHistorySection(props: MatchHistorySectionProps) {
  const { searchedParticipantPuuid, matchIdListPromise } = props;

  const matchIdList = await matchIdListPromise;
  const matchDetailList = await getMatchHistoryList(matchIdList);

  return (
    <section className=" space-y-2">
      <SummaryWidget />
      <MatchDetailWidget puuid={searchedParticipantPuuid} matchDetailList={matchDetailList ?? []} />
    </section>
  );
}
