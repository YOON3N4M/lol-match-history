import SummonersContainer from "@/containers/summoners";
import { upsertRecentSearch } from "@/service/firebase-admin/recent-searches.service";
import { getAccountByRiotId } from "@/service/riot/asia/account.service";
import { getLeagueEntry } from "@/service/riot/kr/league.service";
import { getSummonerByPuuid } from "@/service/riot/kr/summoner.service";
import { handleRiotId } from "@/utils/riot";
import { notFound } from "next/navigation";

/**
 * 라이엇 계정, 소환사 정보, 소환사 랭크 조회는 페이지를 위한
 * 가장 필수적인 정보이기 때문에 해당 데이터들을 await
 */
export default async function SummonersPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const { name, tag } = handleRiotId(username, "-");

  /**
   * 라이엇 계정 정보
   */

  let account;
  try {
    account = await getAccountByRiotId(name, tag);
  } catch {
    notFound();
  }

  const { puuid } = account;

  const [summoner, leagueEntry] = await Promise.all([
    getSummonerByPuuid(puuid),
    getLeagueEntry(puuid),
  ]);

  try {
    await upsertRecentSearch({
      account,
      summoner,
      leagueEntry,
    });
  } catch (error) {
    console.error("최근 검색 유저 저장에 실패했습니다.", error);
  }

  return (
    <SummonersContainer
      account={account}
      summoner={summoner}
      leagueEntry={leagueEntry}
    />
  );
}
