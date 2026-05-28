import SummonerBody from "@/containers/summoners/summonerBody";
import SummonerHead from "@/containers/summoners/summonersHead";
import type { LeagueEntryDto, RiotAccountDto, SummonerDto } from "@/types/riot";

interface SummonersContainerProps {
  account: RiotAccountDto;
  summoner: SummonerDto;
  leagueEntry: LeagueEntryDto[];
  refreshCooldownExpiresAt: number | null;
}
export default function SummonersContainer(props: SummonersContainerProps) {
  const { account, summoner, leagueEntry, refreshCooldownExpiresAt } = props;

  return (
    <div className="min-h-screen">
      <SummonerHead
        account={account}
        summoner={summoner}
        refreshCooldownExpiresAt={refreshCooldownExpiresAt}
      />
      <SummonerBody
        account={account}
        summoner={summoner}
        leagueEntry={leagueEntry}
      />
    </div>
  );
}
