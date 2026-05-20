import { tierIcon } from "@/constants";

/**
 *  티어 표기의 로마 숫자를 아랍 숫자로 변환
 */
export function romeNumToArabNum(rome: string) {
  switch (rome) {
    case "I":
      return 1;
    case "II":
      return 2;
    case "III":
      return 3;
    case "IV":
      return 4;
  }
}

// 각 티어의 문자열과 이미지를 텍스트 대치
export function matchingTierImg(tier: string) {
  switch (tier) {
    case "IRON":
      return tierIcon.IRON;
    case "BRONZE":
      return tierIcon.BRONZE;
    case "SILVER":
      return tierIcon.SILVER;
    case "GOLD":
      return tierIcon.GOLD;
    case "PLATINUM":
      return tierIcon.PLATINUM;
    case "EMERALD":
      return tierIcon.EMERALD;
    case "DIAMOND":
      return tierIcon.DIAMOND;
    case "MASTER":
      return tierIcon.MASTER;
    case "GRANDMASTER":
      return tierIcon.GRANDMASTER;
    case "CHALLENGER":
      return tierIcon.CHALLENGER;
    default:
      return "unranked";
  }
}
