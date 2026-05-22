import { cn } from "@/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export default function LoadingSpinner(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const { className, ...attrs } = props;
  return (
    <div
      className={cn(className, "box-border aspect-square animate-spin rounded-full border-[3px]  border-t-[#4171d6]!")}
      {...attrs}
    />
  );
}
