import { MatchDto } from "@/types/riot";
import { createMostChampionStats, getKDA } from "@/utils/riot";
import MostThreeList from "./MostThreeList";
import WinRateDonutChart from "./WinRateDonutChart";
import { groupByToMap } from "@/utils";
import FavoritePosition from "./FavoritePosition";

interface SummaryWidgetProsp {
  puuid: string;
  matchDetailList: MatchDto[];
}

export default function SummaryWidget(props: SummaryWidgetProsp) {
  const { puuid, matchDetailList } = props;

  /**
   * 조회된 매치 중 검색된 유저의 참가자 정보
   */
  const searchedParticipantList = matchDetailList
    .map((match) => match.info.participants.find((participant) => participant.puuid === puuid))
    .filter((participant): participant is NonNullable<typeof participant> => Boolean(participant));

  /**
   * 총 게임 수
   */
  const totalMatchCount = searchedParticipantList.length;
  /**
   * 총 승리수
   */
  const totalWinCount = searchedParticipantList.filter((_participant) => _participant.win).length;
  /**
   * 다시하기 등의 상태가 반영이 안될 수 있음
   */
  const totalLoseCount = totalMatchCount - totalWinCount;

  /**
   * 전체 게임의 킬 평균
   */
  const totalKillAverage =
    totalMatchCount === 0
      ? 0
      : searchedParticipantList.reduce((sum, participant) => sum + participant.kills, 0) / totalMatchCount;

  const totalDeathAverage =
    totalMatchCount === 0
      ? 0
      : searchedParticipantList.reduce((sum, participant) => sum + participant.deaths, 0) / totalMatchCount;

  const totalAssistAverage = Math.round(
    totalMatchCount === 0
      ? 0
      : searchedParticipantList.reduce((sum, participant) => sum + participant.assists, 0) / totalMatchCount,
  );

  const totalKdaAverage = getKDA(totalKillAverage, totalDeathAverage, totalAssistAverage);

  /**
   * 챔피언 그룹핑
   */
  const mostChampionStatsList = createMostChampionStats(searchedParticipantList);
  const mostThreeStats = mostChampionStatsList.slice(0, 3);

  /**
   *
   */
  const groupByPosition = groupByToMap(searchedParticipantList, (_participant) => _participant.individualPosition);

  console.log(groupByPosition);
  return (
    <div className="bg-white rounded">
      <div className="flex items-center justify-between">
        <span className="px-3 py-2 text-sm leading-5 text-gray-900">최근 게임</span>
      </div>
      <div className="border-t flex px-3 py-2">
        {/* 좌측  */}
        <div className="flex flex-col gap-3 flex-1">
          <span className="text-xs text-gray-600 font-medium">
            {totalMatchCount}전 {totalWinCount}승 {totalLoseCount}패
          </span>
          <div className="flex gap-8 items-center">
            <div>
              <WinRateDonutChart winCount={totalWinCount} totalCount={totalMatchCount} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 font-medium">
                {totalKillAverage} / <span className="text-red-600">{totalDeathAverage}</span> / {totalAssistAverage}
              </span>
              <span className="text-gray-900 font-bold text-[20px]">
                {totalKdaAverage}
                {totalKdaAverage && " : 1"}
              </span>
            </div>
          </div>
        </div>
        {/* 중앙 */}
        <div className="flex flex-col gap-3 flex-1">
          <span className="text-xs text-gray-600 font-medium">플레이한 챔피언 (최근 {totalMatchCount}게임)</span>
          <MostThreeList mostChampionStatsList={mostThreeStats} />
        </div>
        {/* 우측 */}
        <div className="flex flex-col gap-3 flex-1">
          <span className="text-xs text-gray-600 font-medium mx-auto">선호 포지션</span>
          <FavoritePosition totalMatchCount={totalMatchCount} groupByPosition={groupByPosition} />
        </div>
      </div>
    </div>
  );
}
