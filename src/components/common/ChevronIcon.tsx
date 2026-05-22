import { cn } from "@/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type ChevronDirection = "right" | "left" | "top" | "bottom";

interface ChevronIconProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  direction: ChevronDirection;
}

function ChevronIcon(props: ChevronIconProps) {
  const { direction, className, ...attrs } = props;

  function handleDirection(_direction: ChevronDirection) {
    switch (_direction) {
      case "left":
        return "rotate-[-135deg]";
      case "top":
        return "rotate-[-45deg]";
      case "bottom":
        return "rotate-[135deg]";
      case "right":
        return "rotate-[45deg]";
      default:
        return "none";
    }
  }
  return (
    <span
      className={cn(
        className,
        "h-[7px] w-[7px] border-r-2 border-t-2 border-black opacity-50 rotate-[-135deg]",
        handleDirection(direction),
      )}
      {...attrs}
    />
  );
}

export default ChevronIcon;
