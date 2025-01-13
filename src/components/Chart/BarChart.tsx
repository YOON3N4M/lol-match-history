interface BarChartProps {
  percentage: number;
}

function BarChart(props: BarChartProps) {
  const { percentage } = props;

  return (
    <div className="h-[64px] w-[16px] bg-body-bg flex flex-col justify-end">
      <div className="bg-opgg-blue" style={{ height: `${percentage}%` }}></div>
    </div>
  );
}

export default BarChart;
