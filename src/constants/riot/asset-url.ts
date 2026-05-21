import { fixedChampionName } from "@/utils/riot/champion";
import { DATA_DRAGON_VERSION } from "./common";

/**
 * 이미지 관련 URL
 */
export const CHAMPION_ICON_URL = (championName: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/img/champion/${fixedChampionName(
    championName,
  )}.png`;
};

export const SUMMONER_PROFILE_ICON_URL = (iconId: number) => {
  return `http://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/img/profileicon/${iconId}.png`;
};

export const SUMMONER_SPELL_ICON_URL = (spellName?: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/img/spell/${spellName}.png`;
};

export const RUNE_ICON_URL = (runeId?: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${runeId}.png`;
};

export const ITEM_ICON_URL = (itemId: number) => {
  return `https://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/img/item/${itemId}.png`;
};

/**
 * 챔피언 데이터 JSON URL
 */
export const CHAMPIONS_JSON_URL = `https://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/data/ko_KR/champion.json`;
