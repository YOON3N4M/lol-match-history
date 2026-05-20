import { positionIcon } from "@/constants";

interface Props {
  currentMatch: Array<{ individualPosition: string }>;
}

function PositionsBar({ currentMatch }: Props) {
  const { topIcon, jgIcon, midIcon, adcIcon, supIcon } = positionIcon;
  const matchCount = currentMatch.length || 1;
  const positions = {
    top: currentMatch.filter((e) => e.individualPosition === "TOP").length,
    jungle: currentMatch.filter((e) => e.individualPosition === "JUNGLE").length,
    mid: currentMatch.filter((e) => e.individualPosition === "MIDDLE").length,
    adc: currentMatch.filter((e) => e.individualPosition === "BOTTOM").length,
    sup: currentMatch.filter((e) => e.individualPosition === "UTILITY").length,
  };
  const positionList = [
    { id: "top", icon: topIcon, height: `${Math.round((positions.top / matchCount) * 100)}%`, alt: "top" },
    { id: "jungle", icon: jgIcon, height: `${Math.round((positions.jungle / matchCount) * 100)}%`, alt: "jungle" },
    { id: "mid", icon: midIcon, height: `${Math.round((positions.mid / matchCount) * 100)}%`, alt: "mid" },
    { id: "adc", icon: adcIcon, height: `${Math.round((positions.adc / matchCount) * 100)}%`, alt: "adc" },
    { id: "sup", icon: supIcon, height: `${Math.round((positions.sup / matchCount) * 100)}%`, alt: "support" },
  ];

  return (
    <>
      <div className="text-xs leading-4 text-[#758592]">선호 포지션</div>
      <div className="mt-3 flex justify-around">
        {positionList.map((position) => (
          <div key={position.id}>
            <div className="flex h-16 w-4 items-end bg-[#dbe0e4]">
              <div className="w-4 bg-[#5383e8]" style={{ height: position.height }} />
            </div>
            <img className="mt-2 w-4" src={position.icon} alt={position.alt} />
          </div>
        ))}
      </div>
    </>
  );
}
export default PositionsBar;
