"use client";

import { LeagueEntryDto } from "@/types/riot-dto";
import { use } from "react";

interface RankWidgetProps {
  leagueEntryPromise: Promise<LeagueEntryDto[]>;
}

export default function RankWidget(props: RankWidgetProps) {
  const { leagueEntryPromise } = props;

  const leagueEntry = use(leagueEntryPromise);
  console.log(leagueEntry);
  return (
    <div className="flex flex-col gap-2">
      {leagueEntry.map((league) => (
        <RankItem league={league} />
      ))}
    </div>
  );
}

function RankItem({ league }: { league: LeagueEntryDto }) {
  const { queueType, tier, wins, losses, leaguePoints } = league;
  const type = queueType === "RANKED_SOLO_5x5" ? "솔로랭크" : "자유랭크";
  return (
    <div className="bg-white rounded-[4px]">
      <div className="p-2">{type}</div>
      <div className="border-t p-8 flex">
        <div className="w-[72px] aspect-square bg-gray-400"></div>
        <div className="ml-4 flex flex-col">
          <span>{tier}</span>
          <span className="">{leaguePoints}</span>
        </div>
      </div>
    </div>
  );
}
