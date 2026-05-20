import championsData from "@/data/championsData.json";

/**
 * 라이엇 api의 응답값 오탈자 버그 대응
 */
export function fixedChampionName(championName: string) {
  if (championName === "FiddleSticks") return "Fiddlesticks";
  return championName;
}

/**
 * 영문 챔피언 이름을 한글로 변환
 */
export function translateKorChampionName(championName: string) {
  const championsObj: any = championsData.data;
  if (championsObj[fixedChampionName(championName)]) {
    const koreanChampionName = championsObj[fixedChampionName(championName)].name;
    return koreanChampionName;
  }

  return championName;
}
