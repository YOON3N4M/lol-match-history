import type { LeagueEntryDto } from "@/types/riot";
import { getRankEmblemSrc, getWinRate } from "@/utils/riot";

interface RankWidgetProps {
  leagueEntry: LeagueEntryDto[];
}

export default function RankWidget(props: RankWidgetProps) {
  const { leagueEntry } = props;

  const soloRank = leagueEntry.find((league) => league.queueType === "RANKED_SOLO_5x5");
  const flexRank = leagueEntry.find((league) => league.queueType === "RANKED_FLEX_SR");

  return (
    <div className="flex flex-col gap-2">
      <RankItem type="솔로랭크" league={soloRank} />
      <RankItem type="자유랭크" league={flexRank} />
    </div>
  );
}

function RankItem({ type, league }: { type: "솔로랭크" | "자유랭크"; league: LeagueEntryDto | undefined }) {
  return (
    <div className="bg-white rounded-[4px]">
      <div className="p-2 text-sm flex justify-between items-center">
        <span>{type}</span>
        {!league && <span className="font-bold text-gray-300">Unranked</span>}
      </div>
      {league && (
        <div className="border-t border-gray-200 py-8 px-4 flex items-center">
          <div className="w-[72px] aspect-square bg-gray-100 rounded-full flex justify-center items-center">
            <img
              className="object-contain"
              width={60}
              height={60}
              src={getRankEmblemSrc(league.tier)}
              alt={`${league.tier} emblem`}
            />
          </div>
          <div className="ml-4 flex flex-col gap-0.5">
            <span className="text-xl font-bold lowercase first-letter:uppercase">{league.tier}</span>
            <span className="text-xs text-gray-600">{league.leaguePoints} LP</span>
          </div>
          <div className="flex flex-col gap-0.5 text-xs text-gray-400 ml-auto text-right">
            <span>
              {league.wins}승 {league.losses}패
            </span>
            <span>
              승률
              {getWinRate(league.wins, league.losses)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
