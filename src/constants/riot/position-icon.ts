import type { ParticipantDto } from "@/types/riot";

import TOP_ICON from "@/img/lane/top.svg";
import JG_ICON from "@/img/lane/jg.svg";
import MID_ICON from "@/img/lane/mid.svg";
import ADC_ICON from "@/img/lane/adc.svg";
import SUP_ICON from "@/img/lane/sup.svg";

export type LanePosition = Exclude<ParticipantDto["individualPosition"], "Invalid">;

export const POSITION_ICON_BY_POSITION = {
  TOP: TOP_ICON.src,
  JUNGLE: JG_ICON.src,
  MIDDLE: MID_ICON.src,
  BOTTOM: ADC_ICON.src,
  UTILITY: SUP_ICON.src,
} satisfies Record<LanePosition, string>;

export const POSITION_ICON_LIST = [
  { position: "TOP", icon: POSITION_ICON_BY_POSITION.TOP, alt: "top" },
  { position: "JUNGLE", icon: POSITION_ICON_BY_POSITION.JUNGLE, alt: "jungle" },
  { position: "MIDDLE", icon: POSITION_ICON_BY_POSITION.MIDDLE, alt: "mid" },
  { position: "BOTTOM", icon: POSITION_ICON_BY_POSITION.BOTTOM, alt: "bottom" },
  { position: "UTILITY", icon: POSITION_ICON_BY_POSITION.UTILITY, alt: "support" },
] as const;
