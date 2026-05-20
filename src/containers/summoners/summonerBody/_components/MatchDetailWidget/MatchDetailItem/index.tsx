import { QUEUE_TYPE } from "@/constants/riot";
import { CHAMPION_ICON_URL } from "@/constants/riot/asset-url";
import { MatchDto } from "@/types/riot";
import { calculatedTimeDiffer, cn, groupByToMap } from "@/utils";
import ItemSlotList from "./ItemSlotList";
import SpellSlotList from "./SpellSlotList";
import PerksSlotList from "./PerksSlotList";

interface MatchDetailItem {
  puuid: string;
  match: MatchDto;
}
export default function MatchDetailItem(props: MatchDetailItem) {
  const { puuid, match } = props;
  const { metadata, info } = match;
  const { endOfGameResult, queueId, gameCreation, gameDuration, participants } = info;

  const searchedParticipant = participants.find((part) => part.puuid === puuid);

  if (!searchedParticipant) return;

  const { riotIdGameName, win, kills, deaths, assists, teamId, summoner1Id, summoner2Id, perks } = searchedParticipant;

  /**
   * 게임 기본 정보
   */
  const isWin = win;
  const queueType = QUEUE_TYPE[queueId] ?? "기타";
  const gameCreationTime = calculatedTimeDiffer(gameCreation);
  const gameResult = isWin ? "승리" : "패배";
  const gameDurationTime = (gameDuration / 60).toFixed(0);
  const kda = ((kills + assists) / deaths).toFixed(2);

  /**
   * 팀 그룹
   */
  const groupedTeam = groupByToMap(participants, (p) => p.teamId);
  const blueTeam = groupedTeam.get(100) ?? [];
  const purpleTeam = groupedTeam.get(200) ?? [];
  const teamList = [blueTeam, purpleTeam];

  return (
    <div className={cn("rounded-[4px] overflow-hidden", isWin ? "bg-[#ecf2ff]" : "bg-[#fff1f3]")}>
      <div className={cn("px-3 py-1 flex h-[96px] border-l-4!", isWin ? "border-[#5383E8]!" : "border-[#e84057]!")}>
        {/* 좌측*/}
        <div className="w-[108px] flex flex-col text-xs">
          <span>{queueType}</span>
          <span>{gameCreationTime}</span>
          <span>{/* 구분선 필요 */}</span>
          <span>{gameResult}</span>
          <span>{gameDurationTime}분</span>
        </div>
        {/* 중앙 */}
        <div className="w-[377px] flex flex-col gap-1">
          {/* 초상화룬특 */}
          <div className="flex gap-3">
            <div className="flex gap-1">
              {/* 초상화 */}
              <div className="w-12 aspect-square relative">
                <div className="size-full rounded-full overflow-hidden">
                  <img
                    className="size-full rounded-full scale-[115%]"
                    src={CHAMPION_ICON_URL(searchedParticipant.championName)}
                  />
                </div>
              </div>
              {/* 룬특 */}
              <div className="flex gap-0.5 ">
                <div className="w-[22px]">
                  <SpellSlotList spellIdList={[summoner1Id, summoner2Id]} />
                </div>
                <div className="w-[22px]">
                  <PerksSlotList perks={perks} />
                </div>
              </div>
            </div>
            {/* kda */}
            <div className="max-w-[108px] flex flex-1 flex-col items-start gap-0.5">
              <div className="flex items-center gap-1 text-[15px] leading-[22px]">
                <span>{kills}</span>
                <span>{deaths}</span>
                <span>{assists}</span>
              </div>
              <div>{kda}:1 평점</div>
            </div>
            {/* 킬관여? */}
            <div className="flex flex-col flex-1 items-start text-[11px]">
              <span>킬관여</span>
              <span>cs</span>
              <span>평균티어</span>
            </div>
          </div>
          <div></div>
          {/* 아이템 */}
          <div className="flex">
            <ItemSlotList participant={searchedParticipant} />
            {/* 칭호영역인데 없어도 될듯 */}
            {/* <div className="flex"> </div> */}
          </div>
        </div>

        {/* 참여자 */}
        <div className="flex gap-2">
          {teamList.map((team) => (
            <div className="flex flex-col gap-0.5 w-[80px]">
              {team.map((_participant) => (
                <a className="w-full items-center flex gap-1">
                  <img src={CHAMPION_ICON_URL(_participant.championName)} className="w-4 rounded-[4px] bg-black" />
                  <span className="flex-1 truncate text-xs">{_participant.riotIdGameName}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
