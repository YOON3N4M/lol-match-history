export type MatchResult = "win" | "lose";

export const MATCH_RESULT_STYLE = {
  win: {
    containerBg: "bg-main-100 ",
    border: "border-main-500",
    separate: "bg-main-200",
    text: "text-main-600",
    itemSlotBg: "bg-main-300",
    chevron: "border-main-500",
    detailButton: "bg-main-200 hover:bg-main-300",
  },
  lose: {
    containerBg: "bg-red-100 border-red-500",
    border: "border-red-500",
    separate: "bg-red-200",
    text: "text-red-600",
    itemSlotBg: "bg-red-300",
    chevron: "border-red-500",
    detailButton: "bg-red-200 hover:bg-red-300",
  },
} satisfies Record<MatchResult, Record<string, string>>;
