import { getMatchHistoryList } from "@/service/riot/asia/matches-history.service";
import { getMatches } from "@/service/riot/asia/matches.service";
import { getLeagueEntry } from "@/service/riot/kr/league.service";
import type { RiotAccountDto, SummonerDto } from "@/types/riot";
import { Suspense } from "react";
import MatchDetailWidget from "./_components/MatchDetailWidget";
import RankWidget from "./_components/RankWidget";
import SummaryWidget from "./_components/SummaryWidget";

interface SummonerBodyProps {
  account: RiotAccountDto;
  summoner: SummonerDto;
}

export default async function SummonerBody(props: SummonerBodyProps) {
  const { account, summoner } = props;
  const { puuid } = account;

  const leagueEntryPromise = getLeagueEntry(puuid);
  const matchIdList = await getMatches(puuid);
  const matchDetailList = await getMatchHistoryList(matchIdList);

  console.log(matchDetailList);

  return (
    <div className="content-layout flex gap-2 mt-2">
      <div className="basis-[30.74%]">
        <Suspense>
          <RankWidget leagueEntryPromise={leagueEntryPromise} />
        </Suspense>
      </div>
      <div className="flex-1 space-y-2">
        <SummaryWidget />
        <MatchDetailWidget puuid={puuid} matchDetailList={matchDetailList ?? []} />
      </div>
    </div>
  );
}
