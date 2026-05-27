import SummonerBody from "@/containers/summoners/summonerBody";
import SummonerHead from "@/containers/summoners/summonersHead";
import type { LeagueEntryDto, RiotAccountDto, SummonerDto } from "@/types/riot";

interface SummonersContainerProps {
  account: RiotAccountDto;
  summoner: SummonerDto;
  leagueEntry: LeagueEntryDto[];
}
export default function SummonersContainer(props: SummonersContainerProps) {
  const { account, summoner, leagueEntry } = props;

  return (
    <div className="min-h-screen">
      <SummonerHead account={account} summoner={summoner} />
      <SummonerBody
        account={account}
        summoner={summoner}
        leagueEntry={leagueEntry}
      />
    </div>
  );
}
