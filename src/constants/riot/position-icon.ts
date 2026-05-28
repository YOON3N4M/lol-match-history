import type { ParticipantDto } from "@/types/riot";

export type LanePosition = Exclude<
  ParticipantDto["individualPosition"],
  "Invalid"
>;

export const POSITION_ICON_BY_POSITION = {
  TOP: "/images/lane/top.svg",
  JUNGLE: "/images/lane/jg.svg",
  MIDDLE: "/images/lane/mid.svg",
  BOTTOM: "/images/lane/adc.svg",
  UTILITY: "/images/lane/sup.svg",
} satisfies Record<LanePosition, string>;

export const POSITION_ICON_LIST = [
  { position: "TOP", icon: POSITION_ICON_BY_POSITION.TOP, alt: "top" },
  { position: "JUNGLE", icon: POSITION_ICON_BY_POSITION.JUNGLE, alt: "jungle" },
  { position: "MIDDLE", icon: POSITION_ICON_BY_POSITION.MIDDLE, alt: "mid" },
  { position: "BOTTOM", icon: POSITION_ICON_BY_POSITION.BOTTOM, alt: "bottom" },
  {
    position: "UTILITY",
    icon: POSITION_ICON_BY_POSITION.UTILITY,
    alt: "support",
  },
] as const;
