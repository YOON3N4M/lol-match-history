type MatchResult = "win" | "lose";

export const MATCH_RESULT_STYLE = {
  win: {
    container: "bg-[#ecf2ff] border-[#5383E8]!",
    text: "text-[#4171d6]",
    subText: "text-[#5383E8]",
    itemBg: "bg-[#b3cdff]",
  },
  lose: {
    container: "bg-[#fff1f3] border-[#e84057]!",
    text: "text-[#d31a45]",
    subText: "text-[#e84057]",
    itemBg: "bg-[#ffbac3]",
  },
} satisfies Record<MatchResult, Record<string, string>>;
