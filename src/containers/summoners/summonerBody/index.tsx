import { getMatches } from "@/service/riot/asia/matches.service";
import type { LeagueEntryDto, RiotAccountDto, SummonerDto } from "@/types/riot";
import { Suspense } from "react";
import MatchHistorySection from "./_components/MatchHistorySection";
import MatchHistoryLoading from "./_components/MatchHistorySection/MatchHistoryLoading";
import RankWidget from "./_components/RankWidget";

interface SummonerBodyProps {
  account: RiotAccountDto;
  summoner: SummonerDto;
  leagueEntry: LeagueEntryDto[];
}

export default function SummonerBody(props: SummonerBodyProps) {
  const { account, summoner, leagueEntry } = props;
  const { puuid } = account;

  const matchIdList = getMatches(puuid);

  return (
    <div className="content-layout flex gap-2 mt-2">
      <div className="basis-[30.74%]">
        <RankWidget leagueEntry={leagueEntry} />
      </div>
      <div className="flex-1">
        <Suspense fallback={<MatchHistoryLoading />}>
          <MatchHistorySection searchedParticipantPuuid={puuid} matchIdListPromise={matchIdList} />
        </Suspense>
      </div>
    </div>
  );
}
