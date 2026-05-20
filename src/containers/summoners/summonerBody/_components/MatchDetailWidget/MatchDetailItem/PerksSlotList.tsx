import { PERKS_TYPE } from "@/constants/riot";
import { RUNE_ICON_URL } from "@/constants/riot/asset-url";
import { PerksDto } from "@/types/riot/perks.dto";
import { cn } from "@/utils";

interface PerksSlotListProps {
  perks: PerksDto;
}

export default function PerksSlotList(props: PerksSlotListProps) {
  const { perks } = props;
  const { styles } = perks;

  const [primaryPerk, subPerk] = styles;

  const perksIdList = [primaryPerk.selections[0].perk, subPerk.style];

  return (
    <div className="w-full flex flex-col gap-0.5">
      {perksIdList.map((id, idx) => (
        <div className={cn("w-full aspect-square rounded overflow-hidden rounded-full", idx === 0 && "bg-black")}>
          <img width={22} height={22} src={RUNE_ICON_URL(PERKS_TYPE[id])} />
        </div>
      ))}
    </div>
  );
}
