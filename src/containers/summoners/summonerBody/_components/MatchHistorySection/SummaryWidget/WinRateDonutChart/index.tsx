import { DonutChart } from "@/components/charts";

interface WinRateDonutChartProps {
  winCount: number;
  totalCount: number;
}

export default function WinRateDonutChart(props: WinRateDonutChartProps) {
  const { winCount, totalCount } = props;

  const loseCount = totalCount - winCount;
  const winRate = Math.round((winCount / totalCount) * 100);

  return (
    <DonutChart
      data={[
        { label: "win", value: winCount, color: "#5383E8" },
        { label: "lose", value: loseCount, color: "#E84057" },
      ]}
      centerLabel={<strong className="text-sm text-main-500 font-bold">{winRate}%</strong>}
    />
  );
}
