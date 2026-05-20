import { ITEM_ICON_URL } from "@/constants/riot/asset-url";
import { ParticipantDto } from "@/types/riot/participant.dto";

interface ItemSlotListProps {
  participant: ParticipantDto;
}

export default function ItemSlotList(props: ItemSlotListProps) {
  const { participant } = props;
  const { item0, item1, item2, item3, item4, item5, item6 } = participant;
  const itemList = [item0, item1, item2, item3, item4, item5, item6];

  const hasItem = (itemId: number) => itemId !== 0;

  return (
    <div className="flex gap-0.5">
      {itemList.map((item) => (
        <div className="size-[21px] rounded bg-black overflow-hidden">
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
