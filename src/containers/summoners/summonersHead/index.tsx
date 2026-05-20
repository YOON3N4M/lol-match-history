import { SUMMONER_PROFILE_ICON_URL } from "@/constants/riot/asset-url";
import type { RiotAccountDto, SummonerDto } from "@/types/riot";

interface SummonerHeadProps {
  account: RiotAccountDto;
  summoner: SummonerDto;
}

export default function SummonerHead(props: SummonerHeadProps) {
  const { account, summoner } = props;

  const { gameName, tagLine } = account;
  const { profileIconId, summonerLevel } = summoner;

  return (
    <section className="content-layout py-12 flex gap-3 items-center">
      <div className="flex flex-col">
        <div className="size-[100px] relative">
          <div className="size-full rounded-[20px] overflow-hidden bg-gray-700">
            <img width={100} height={100} className="size-full" src={SUMMONER_PROFILE_ICON_URL(profileIconId)} />
          </div>
          <span className="absolute bottom-0 x-center bg-gray-900 text-xs h-5 px-2 flex items-center rounded-[10px] text-white translate-y-1/2">
            {summonerLevel}
          </span>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold">
          {gameName}
          <span className="ml-1 font-medium text-gray-400">#{tagLine}</span>
        </h2>
      </div>
    </section>
  );
}
