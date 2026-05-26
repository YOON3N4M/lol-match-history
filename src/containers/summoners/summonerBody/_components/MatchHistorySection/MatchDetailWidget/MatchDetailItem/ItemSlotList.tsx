import { ITEM_ICON_URL } from "@/constants/riot";
import type { ParticipantDto } from "@/types/riot";
import { MATCH_RESULT_STYLE, MatchResult } from "../match-result-style";
import { cn } from "@/utils";

interface ItemSlotListProps {
  matchResult: MatchResult;
  itemList: number[];
}

export default function ItemSlotList(props: ItemSlotListProps) {
  const { matchResult, itemList } = props;

  const hasItem = (itemId: number) => itemId !== 0;
  const matchResultStyle = MATCH_RESULT_STYLE[matchResult];
  const isWardSlot = (_index: number) => _index === itemList.length - 1;

  return (
    <div className="flex gap-0.5">
      {itemList.map((item, index) => (
        <div
          className={cn(
            "size-[21px] rounded overflow-hidden",
            matchResultStyle.itemSlotBg,
            isWardSlot(index) && "rounded-full!",
          )}
        >
          {hasItem(item) && (
            <div className="">
              <img width={32} height={32} src={ITEM_ICON_URL(item)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
