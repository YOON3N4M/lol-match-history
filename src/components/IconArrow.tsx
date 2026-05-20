interface IconArrowProps {
  direction: "right" | "left" | "top" | "bottom";
}

function IconArrow(props: IconArrowProps) {
  const { direction } = props;

  function handleDirection() {
    switch (direction) {
      case "left":
        return "rotate(-135deg)";
      case "top":
        return "rotate(-45deg)";
      case "bottom":
        return "rotate(135deg)";
      case "right":
        return "rotate(45deg)";
      default:
        return "none";
    }
  }
  return (
    <div
      className="h-[7px] w-[7px] border-r border-t border-black opacity-50"
      style={{
        transform: `${handleDirection()}`,
      }}
    />
  );
}

export default IconArrow;
