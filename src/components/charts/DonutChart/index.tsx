import type { ReactNode } from "react";

type DonutChartItem = {
  label: string;
  value: number;
  color: string;
};

export interface DonutChartProps {
  data: DonutChartItem[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: ReactNode;
  className?: string;
}

export function DonutChart({ data, size = 90, strokeWidth = 28, centerLabel, className }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return null;
  }

  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  let accumulated = 0;

  return (
    <div className={`relative ${className ?? ""}`} style={{ width: size, height: size }}>
      {centerLabel && (
        <div className="absolute inset-0 flex items-center justify-center text-center">{centerLabel}</div>
      )}

      <svg viewBox="0 0 200 200">
        {data.map((item) => {
          const ratio = item.value / total;
          const dash = ratio * circumference;
          const offset = -accumulated * circumference;

          accumulated += ratio;

          return (
            <circle
              key={item.label}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset}
            />
          );
        })}
      </svg>
    </div>
  );
}
