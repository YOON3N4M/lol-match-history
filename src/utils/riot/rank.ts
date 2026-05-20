import { RANK_EMBLEM_SRC } from "@/constants/riot";

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

export function getRankEmblemSrc(tier: string) {
  return RANK_EMBLEM_SRC[tier as keyof typeof RANK_EMBLEM_SRC];
}
