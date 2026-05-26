import { cn } from "@/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface BarChartProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeBarColor: string;
  activeBarHeight: number;
}

export function BarChart(props: BarChartProps) {
  const { activeBarColor, activeBarHeight, className, ...attrs } = props;
  return (
    <div className={cn(className, "relative bg-gray-200")} {...attrs}>
      <div
        className="absolute w-full left-0 bottom-0"
        style={{
          backgroundColor: activeBarColor,
          height: `${activeBarHeight}%`,
        }}
      ></div>
    </div>
  );
}
