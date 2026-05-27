import React from "react";
import { MATCH_RESULT_STYLE, MatchResult } from "../match-result-style";
import { cn } from "@/utils";
import { MatchParticipantWithStats } from "@/types/riot";
import { CHAMPION_ICON_URL } from "@/constants/riot";
import SpellSlotList from "./SpellSlotList";
import PerksSlotList from "./PerksSlotList";
import {
  formatNumberWithComma,
  getKDA,
  getKDADisplay,
  getKdaTextColor,
} from "@/utils/riot";
import ItemSlotList from "./ItemSlotList";
import { BarChart } from "@/components/charts";

interface MatchDetailSummaryProps {
  searchedSummonerPuuid: string;
  matchResult: MatchResult;
  blueTeam: MatchParticipantWithStats[];
  redTeam: MatchParticipantWithStats[];
}
export default function MatchDetailSummary(props: MatchDetailSummaryProps) {
  const { searchedSummonerPuuid, matchResult, blueTeam, redTeam } = props;
  const matchResultStyle = MATCH_RESULT_STYLE[matchResult];

  return (
    <div className="mt-1">
      <div className="flex h-9 w-full rounded bg-white px-1">
        <button
          className={cn(
            "fond-bold my-1 basis-1/5 rounded px-2 text-sm",
            matchResultStyle.separate,
            matchResultStyle.text,
          )}
        >
          종합
        </button>
      </div>
      <div className="mt-1 overflow-hidden rounded border border-gray-200">
        <div className="flex flex-col">
          {/* 블루팀 */}
          {blueTeam && (
            <TeamTable
              searchedSummonerPuuid={searchedSummonerPuuid}
              team={blueTeam}
            />
          )}
          {/* 레드팀 */}
          {redTeam && (
            <TeamTable
              searchedSummonerPuuid={searchedSummonerPuuid}
              team={redTeam}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function TeamTable({
  searchedSummonerPuuid,
  team,
}: {
  searchedSummonerPuuid: string;
  team: MatchParticipantWithStats[];
}) {
  const isWin = team[0].win;
  const teamName = team[0].teamId === 100 ? "블루팀" : "레드팀";
  const matchResult: MatchResult = isWin ? "win" : "lose";
  const gameResult = isWin ? "승리" : "패배";
  const matchResultStyle = MATCH_RESULT_STYLE[matchResult];
  return (
    <div>
      <table className="w-full">
        <colgroup>
          <col className="w-auto"></col>
          <col className="w-[68px]"></col>
          <col className="w-[98px]"></col>
          <col className="w-[100px]"></col>
          <col className="w-[48px]"></col>
          <col className="w-[56px]"></col>
          <col className="w-[195px]"></col>
        </colgroup>
        <thead>
          <tr className="bg-white text-xs font-light text-gray-400">
            <th scope="col" className="flex justify-start pl-3 leading-[32px]">
              <span>
                <span className={cn("font-bold", matchResultStyle.text)}>
                  {gameResult}
                </span>
                {`(${teamName})`}
              </span>
            </th>
            <th scope="col">
              <span></span>
            </th>
            <th scope="col">
              <span>KDA</span>
            </th>
            <th scope="col">
              <span>피해량</span>
            </th>
            <th scope="col">
              <span>와드</span>
            </th>
            <th scope="col">
              <span>CS</span>
            </th>
            <th scope="col">
              <span>아이템</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {team.map((_participant) => (
            <ParticipantRow
              searchedSummonerPuuid={searchedSummonerPuuid}
              participant={_participant}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ParticipantRow({
  searchedSummonerPuuid,
  participant,
}: {
  searchedSummonerPuuid: string;
  participant: MatchParticipantWithStats;
}) {
  const {
    puuid,
    championName,
    summoner1Id,
    summoner2Id,
    riotIdGameName,
    riotIdTagline,
    perks,
    kills,
    deaths,
    assists,
    totalDamageDealtToChampions,
    totalDamageTaken,
    dealtParticipation,
    takenParticipation,
    csCount,
    csPerMinute,
    itemList,
    killParticipation,
    win,
  } = participant;

  const kdaValue = getKDA(kills, deaths, assists);
  const kdaDisplay = getKDADisplay(kdaValue);
  const kdaTextColor = getKdaTextColor(kdaValue);

  const matchResult: MatchResult = win ? "win" : "lose";
  const matchResultStyle = MATCH_RESULT_STYLE[matchResult];

  const isSearchedSummoner = puuid === searchedSummonerPuuid;

  return (
    <tr
      className={cn(
        isSearchedSummoner
          ? matchResultStyle.separate
          : matchResultStyle.containerBg,
      )}
    >
      <td className="p-1 pl-3!">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <a className="relative size-8">
              <img
                width={32}
                height={32}
                className="size-8 rounded-full"
                src={CHAMPION_ICON_URL(championName)}
              />
            </a>
            <div className="flex gap-0.5">
              <div className="w-4">
                <SpellSlotList spellIdList={[summoner1Id, summoner2Id]} />
              </div>
              <div className="w-4">
                <PerksSlotList perks={perks} />
              </div>
            </div>
          </div>
          <div className="flex max-w-[90px] flex-col text-xs">
            <a
              className="flex w-full items-center gap-1 truncate"
              href={`/summoners/kr/${riotIdGameName}-${riotIdTagline}`}
            >
              {riotIdGameName}
            </a>
            <span className="text-[11px] text-gray-600">{`#${riotIdTagline}`}</span>
          </div>
        </div>
      </td>
      <td></td>
      <td>
        <div className="flex flex-col items-center text-[11px]">
          <span className="text-gray-600">
            {kills}/{deaths}/{assists}
            {` (${killParticipation}%)`}
          </span>
          <span className={cn("leading-[14px] font-bold", kdaTextColor)}>
            {kdaDisplay}
          </span>
        </div>
      </td>
      <td>
        <div className="flex justify-center gap-1 text-[11px] text-gray-600">
          <div className="flex flex-1 flex-col items-center gap-0.5">
            <span>{formatNumberWithComma(totalDamageDealtToChampions)}</span>
            <BarChart
              className="h-[6px] w-full"
              colors={{ track: "#fff", indicator: "#E84057" }}
              value={dealtParticipation}
              orientation="horizontal"
            />
          </div>
          <div className="flex flex-1 flex-col items-center gap-0.5">
            <span>{formatNumberWithComma(totalDamageTaken)}</span>
            <BarChart
              className="h-[6px] w-full"
              colors={{ track: "#fff", indicator: "#9AA4AF" }}
              value={takenParticipation}
              orientation="horizontal"
            />
          </div>
        </div>
      </td>
      {/* wards */}
      <td></td>
      {/* cs */}
      <td>
        <div className="flex flex-col items-center gap-0.5 text-[11px] text-gray-600">
          <span>{csCount}</span>
          <span>분당 {csPerMinute}</span>
        </div>
      </td>
      <td>
        <div className="flex justify-center">
          <ItemSlotList matchResult={matchResult} itemList={itemList} />
        </div>
      </td>
    </tr>
  );
}
