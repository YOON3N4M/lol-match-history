import SummonersContainer from "@/containers/summoners";
import { getAccountByRiotId } from "@/service/riot/asia/account.service";
import { getSummonerByPuuid } from "@/service/riot/kr/summoner.service";
import { handleRiotId } from "@/utils";
import { notFound } from "next/navigation";

export default async function SummonersPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { name, tag } = handleRiotId(username, "-");

  const account = await getAccountByRiotId(name, tag);

  if (!account) {
    notFound();
  }

  const summoner = await getSummonerByPuuid(account.puuid);

  return <SummonersContainer account={account} summoner={summoner} />;
}
