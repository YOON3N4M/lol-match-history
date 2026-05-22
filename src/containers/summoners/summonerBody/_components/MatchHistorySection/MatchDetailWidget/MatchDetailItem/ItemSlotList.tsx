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

  return (
    <div className="flex gap-0.5">
      {itemList.map((item) => (
        <div className={cn("size-[21px] rounded overflow-hidden", matchResultStyle.itemSlotBg)}>
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
