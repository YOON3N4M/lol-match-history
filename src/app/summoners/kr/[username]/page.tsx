import SummonersContainer from "@/containers/summoners";
import { getAccountByRiotId } from "@/service/riot/asia/account.service";
import { getSummonerByPuuid } from "@/service/riot/kr/summoner.service";
import { handleRiotId } from "@/utils";
import { notFound } from "next/navigation";

export default async function SummonersPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { name, tag } = handleRiotId(username, "-");

  // 계정 정보
  const account = await getAccountByRiotId(name, tag);

  if (!account) {
    notFound();
  }

  const { puuid } = account;

  console.log(account);
  // 소환사 정보
  const summoner = await getSummonerByPuuid(puuid);
  console.log(account, summoner);

  /**
   * 계정 정보와 소환사 정보는 필수 데이터이기때문에
   * await 하여 처리하여 유저에게 먼저 ui 제공
   *
   * 리그(랭크) 정보 및 대전 정보는
   * 1. 계정, 소환사 정보 이후에 순차적으로 이루어지는 요청
   * 2. 상대적으로 응답이 오래걸리는 요청
   * 이기때문에 순차적으로 제공
   */

  return <SummonersContainer account={account} summoner={summoner} />;
}
