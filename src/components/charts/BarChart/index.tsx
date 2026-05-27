import { cn } from "@/utils";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";

type BarChartOrientation = "vertical" | "horizontal";

type BarChartColors = {
  track: string;
  indicator: string;
};

export interface BarChartProps extends ComponentPropsWithoutRef<"div"> {
  value: number;
  orientation?: BarChartOrientation;
  colors?: Partial<BarChartColors>;
}

const DEFAULT_COLORS: BarChartColors = {
  track: "#E5E7EB",
  indicator: "#5383E8",
};

export function BarChart({
  value,
  orientation = "vertical",
  colors,
  className,
  style,
  ...attrs
}: BarChartProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const chartColors = {
    ...DEFAULT_COLORS,
    ...colors,
  };
  const isHorizontal = orientation === "horizontal";
  const indicatorStyle: CSSProperties = isHorizontal
    ? { width: `${normalizedValue}%`, height: "100%" }
    : { width: "100%", height: `${normalizedValue}%` };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundColor: chartColors.track,
        ...style,
      }}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={normalizedValue}
      role="meter"
      {...attrs}
    >
      <div
        className={cn("absolute bottom-0 left-0", isHorizontal ? "top-0" : "")}
        style={{
          backgroundColor: chartColors.indicator,
          ...indicatorStyle,
        }}
      />
    </div>
  );
}
