import { SPELL_TYPE } from "@/constants/riot";
import { SUMMONER_SPELL_ICON_URL } from "@/constants/riot/asset-url";

interface SpellSlotListProps {
  spellIdList: number[];
}

export default function SpellSlotList(props: SpellSlotListProps) {
  const { spellIdList } = props;

  return (
    <div className="w-full flex flex-col gap-0.5">
      {spellIdList.map((spellId) => (
        <div className="w-full aspect-square rounded overflow-hidden">
          <img width={22} height={22} src={SUMMONER_SPELL_ICON_URL(SPELL_TYPE[spellId])} />
        </div>
      ))}
    </div>
  );
}
