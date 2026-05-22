import SummonersContainer from "@/containers/summoners";
import { getAccountByRiotId } from "@/service/riot/asia/account.service";
import { getLeagueEntry } from "@/service/riot/kr/league.service";
import { getSummonerByPuuid } from "@/service/riot/kr/summoner.service";
import { handleRiotId } from "@/utils/riot";
import { notFound } from "next/navigation";

/**
 * 라이엇 계정, 소환사 정보, 소환사 랭크 조회는 페이지를 위한
 * 가장 필수적인 정보이기 때문에 해당 데이터들을 await
 */
export default async function SummonersPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { name, tag } = handleRiotId(username, "-");

  /**
   * 라이엇 계정 정보
   */
  const account = await getAccountByRiotId(name, tag);
  if (!account) {
    notFound();
  }
  const { puuid } = account;

  /**
   * 소환사 정보
   */
  const summoner = await getSummonerByPuuid(puuid);

  /**
   * 소환사 리그(랭크) 정보
   */
  const leagueEntry = await getLeagueEntry(puuid);

  return <SummonersContainer account={account} summoner={summoner} leagueEntry={leagueEntry} />;
}
