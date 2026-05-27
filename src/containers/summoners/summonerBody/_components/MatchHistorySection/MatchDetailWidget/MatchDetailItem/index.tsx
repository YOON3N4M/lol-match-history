"use client";

import { QUEUE_TYPE } from "@/constants/riot";
import { CHAMPION_ICON_URL } from "@/constants/riot";
import { MatchDto } from "@/types/riot";
import { calculatedTimeDiffer, cn } from "@/utils";
import { createMatchParticipantsSummary, getKDADisplay } from "@/utils/riot";
import { MATCH_RESULT_STYLE, MatchResult } from "../match-result-style";
import ItemSlotList from "./ItemSlotList";
import PerksSlotList from "./PerksSlotList";
import SpellSlotList from "./SpellSlotList";
import ChevronIcon from "@/components/common/ChevronIcon";
import { useState } from "react";
import MatchDetailSummary from "./MatchDetailSummary";

interface MatchDetailItem {
  puuid: string;
  match: MatchDto;
}
export default function MatchDetailItem(props: MatchDetailItem) {
  const { puuid, match } = props;
  const { info } = match;
  const { queueId, gameCreation, gameDuration, participants } = info;

  const [isSummaryOepn, setIsSummaryOpen] = useState(false);

  /**
   * 팀 그룹
   */
  const matchParticipantsSummary = createMatchParticipantsSummary(
    participants,
    gameDuration,
  );
  const searchedParticipant =
    matchParticipantsSummary.participantsByPuuid[puuid];
  const blueTeam = matchParticipantsSummary["blueTeam"];
  const redTeam = matchParticipantsSummary["redTeam"];
  const teamList = [blueTeam, redTeam];

  /**
   * 검색된 유저 정보
   */
  if (!searchedParticipant) return;
  const {
    win,
    kills,
    deaths,
    assists,
    summoner1Id,
    summoner2Id,
    perks,
    csCount,
    csPerMinute,
    killParticipation,
    kda,
    itemList,
  } = searchedParticipant;

  const kdaDisplay = getKDADisplay(kda);
  /**
   * 게임 기본 정보
   */
  const isWin = win;
  const queueType = QUEUE_TYPE[queueId] ?? "기타";
  const gameCreationTime = calculatedTimeDiffer(gameCreation);
  const gameResult = isWin ? "승리" : "패배";
  const gameDurationTime = (gameDuration / 60).toFixed(0);

  /**
   * 승/패에 따른 ui 컬러 분기
   */
  const matchResult: MatchResult = win ? "win" : "lose";
  const matchResultStyle = MATCH_RESULT_STYLE[matchResult];

  const isSearchedSummoner = (_puuid: string) => puuid === _puuid;
  return (
    <div>
      <div
        className={cn(
          "flex overflow-hidden rounded-[4px]",
          matchResultStyle.containerBg,
        )}
      >
        <div
          className={cn(
            "flex h-[96px] items-center border-l-[6px] px-3 py-1",
            matchResultStyle.border,
          )}
        >
          {/* 좌측*/}
          <div className="flex w-[108px] flex-col gap-2 text-xs">
            <div className="flex flex-col">
              <span className={cn("font-bold", matchResultStyle.text)}>
                {queueType}
              </span>
              <span className="text-gray-600">{gameCreationTime}</span>
            </div>
            <span
              className={cn("h-[1px] w-12", matchResultStyle.separate)}
            ></span>
            <div className="flex flex-col">
              <span className="font-bold text-gray-600">{gameResult}</span>
              <span className="text-gray-600">{gameDurationTime}분</span>
            </div>
          </div>
          {/* 중앙 */}
          <div className="flex w-[377px] flex-col gap-1">
            {/* 초상화룬특 */}
            <div className="flex gap-3">
              <div className="flex gap-1">
                {/* 초상화 */}
                <div className="relative aspect-square w-12">
                  <div className="size-full overflow-hidden rounded-full">
                    <img
                      className="size-full scale-[115%] rounded-full"
                      src={CHAMPION_ICON_URL(searchedParticipant.championName)}
                    />
                  </div>
                </div>
                {/* 룬특 */}
                <div className="flex gap-0.5">
                  <div className="w-[22px]">
                    <SpellSlotList spellIdList={[summoner1Id, summoner2Id]} />
                  </div>
                  <div className="w-[22px]">
                    <PerksSlotList perks={perks} />
                  </div>
                </div>
              </div>
              {/* kda */}
              <div className="flex max-w-[108px] flex-1 flex-col items-start gap-0.5">
                <div className="flex items-center gap-1 text-[15px] leading-[22px] text-gray-400">
                  <strong className="text-gray-900">{kills}</strong>/
                  <strong className="text-red-600">{deaths}</strong>/
                  <strong className="text-gray-900">{assists}</strong>
                </div>
                <div className="text-xs text-gray-500">{kdaDisplay} 평점</div>
              </div>
              {/* 킬관여? */}
              <div className="relative flex flex-1 flex-col items-start pl-2 text-[11px] text-gray-600">
                <span
                  className={cn(
                    "absolute top-0 left-0 h-full w-[1px]",
                    matchResultStyle.separate,
                  )}
                ></span>
                <span>킬관여 {killParticipation}%</span>
                <span>
                  cs {`${csCount}`}
                  {csPerMinute ? ` (${csPerMinute})` : ""}
                </span>
              </div>
            </div>
            <div></div>
            {/* 아이템 */}
            <div className="flex">
              <ItemSlotList matchResult={matchResult} itemList={itemList} />
            </div>
          </div>

          {/* 참여자 */}
          <div className="flex gap-2">
            {teamList.map((team) => (
              <div className="flex w-[80px] flex-col gap-0.5">
                {team.map((_participant) => (
                  <a
                    className="flex w-full items-center gap-1"
                    href={`/summoners/kr/${_participant.riotIdGameName}-${_participant.riotIdTagline}`}
                  >
                    <img
                      src={CHAMPION_ICON_URL(_participant.championName)}
                      className="w-4 rounded-[4px] bg-black"
                    />
                    <span
                      className={cn(
                        "flex-1 truncate text-xs text-gray-500",
                        isSearchedSummoner(_participant.puuid) && "text-black!",
                      )}
                    >
                      {_participant.riotIdGameName}
                    </span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsSummaryOpen((prev) => !prev)}
          className={cn(
            "ml-auto flex basis-10 flex-col items-center justify-end p-2",
            matchResultStyle.detailButton,
          )}
        >
          <ChevronIcon
            direction="bottom"
            className={matchResultStyle.chevron}
          />
        </button>
      </div>
      {isSummaryOepn && (
        <MatchDetailSummary
          searchedSummonerPuuid={puuid}
          blueTeam={blueTeam}
          redTeam={redTeam}
          matchResult={matchResult}
        />
      )}
    </div>
  );
}
