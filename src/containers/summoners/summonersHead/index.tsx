import { SUMMONER_PROFILE_ICON_URL } from "@/constants/riot";
import type { RiotAccountDto, SummonerDto } from "@/types/riot";
import HistoryRefreshButton from "./HistoryRefreshButton";

interface SummonerHeadProps {
  account: RiotAccountDto;
  summoner: SummonerDto;
  refreshCooldownExpiresAt: number | null;
}

export default function SummonerHead(props: SummonerHeadProps) {
  const { account, summoner, refreshCooldownExpiresAt } = props;

  const { gameName, tagLine } = account;
  const { profileIconId, summonerLevel } = summoner;

  return (
    <div className="bg-white">
      <section className="content-layout flex items-center gap-3 py-12">
        <div className="flex flex-col">
          <div className="relative size-[100px]">
            <div className="size-full overflow-hidden rounded-[20px] bg-gray-700">
              <img
                width={100}
                height={100}
                className="size-full"
                src={SUMMONER_PROFILE_ICON_URL(profileIconId)}
                alt={`${gameName} profile icon`}
              />
            </div>
            <span className="absolute bottom-0 x-center flex h-5 translate-y-1/2 items-center rounded-[10px] bg-gray-900 px-2 text-xs text-white">
              {summonerLevel}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            {gameName}
            <span className="ml-1 font-medium text-gray-400">#{tagLine}</span>
          </h2>
          <HistoryRefreshButton
            key={`${gameName}:${tagLine}:${refreshCooldownExpiresAt ?? "ready"}`}
            gameName={gameName}
            tagLine={tagLine}
            cooldownExpiresAt={refreshCooldownExpiresAt}
          />
        </div>
      </section>
      <div className="border-t">
        <div className="content-layout">
          <button className="my-1 h-9 rounded bg-main-100 px-4 text-sm font-bold text-main-600">
            종합
          </button>
        </div>
      </div>
    </div>
  );
}
