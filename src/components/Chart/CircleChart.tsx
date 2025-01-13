interface CircleChartProps {
  totalGameCount: number;
  winGameCount: number;
}

function CircleChart(props: CircleChartProps) {
  const { totalGameCount, winGameCount } = props;

  return (
    <svg viewBox="0 0 200 200">
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#E84057"
        strokeWidth="30"
      />
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#5383E8"
        strokeWidth="30"
        strokeDasharray={`${
          (2 * Math.PI * 80 * winGameCount) / totalGameCount
        } ${2 * Math.PI * 80 * (1 - winGameCount / totalGameCount)}`}
        strokeDashoffset={2 * Math.PI * 90 * 0.22}
      />
    </svg>
  );
}

export default CircleChart;
