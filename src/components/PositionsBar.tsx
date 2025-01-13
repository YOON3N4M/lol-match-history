import { POSITION, PositionType, positionIcon } from "@/constants";
import BarChart from "./Chart/BarChart";

interface Props {
  currentMatchList: any;
}

function PositionsBar({ currentMatchList }: Props) {
  const { topIcon, jgIcon, midIcon, adcIcon, supIcon } = positionIcon;

  return (
    <>
      <h3 className="text-xs text-opgg-gray-text">선호 포지션</h3>
      <ul className="flex justify-around mt-sm">
        {POSITION.map((item) => (
          <li>
            <Position matchList={currentMatchList} position={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
export default PositionsBar;

interface PositionProps {
  matchList: any[];
  position: PositionType;
}

function Position(props: PositionProps) {
  const { matchList, position } = props;

  const positionMatchList = matchList.filter(
    (item) => item.individualPosition === position
  );
  const percentage = (positionMatchList.length / matchList.length) * 100;
  return (
    <>
      <BarChart percentage={percentage} />
    </>
  );
}
