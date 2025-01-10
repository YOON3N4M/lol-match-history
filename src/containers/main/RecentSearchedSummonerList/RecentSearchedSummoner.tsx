import { SUMMONER_PROFILE_ICON_URL } from "@/constants";
import { UserDocument } from "@/types/types";
import {
  calculatedTimeDiffer,
  handleRiotId,
  matchingTierImg,
  romeNumToArabNum,
} from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RecentSearchedSummonerProps {
  userDocument: UserDocument;
}

function RecentSearchedSummoner(props: RecentSearchedSummonerProps) {
  const { userDocument } = props;
  const {
    riotId: stringRiotId,
    profileIconId,
    name,
    summonerLevel,
    league1,
    lastRequestTime,
  } = userDocument;

  const router = useRouter();

  const riotId = stringRiotId
    ? handleRiotId(stringRiotId, "#")
    : { name, tag: "" };

  function handleSummonerClick() {
    router.push(`summoners/kr/${riotId.name}-${riotId.tag}`);
  }

  const tag = riotId.tag === "" ? "" : `#${riotId.tag}`;

  let tier;
  let rank;
  if (league1) {
    tier =
      league1.tier.toLowerCase().charAt(0).toUpperCase() +
      league1.tier.toLowerCase().substring(1);
    rank = romeNumToArabNum(league1.rank);
  }

  return (
    <div
      onClick={handleSummonerClick}
      className="flex py-[10px] px-[20px] mo:p-[8px] border-b items-center cursor-pointer hover:bg-[#f7f7f9]"
    >
      {/* 아이콘, 레벨 영역 */}
      <div>
        <div className="relative size-[50px]">
          <Image
            className="rounded-md"
            src={SUMMONER_PROFILE_ICON_URL(profileIconId)}
            width={50}
            height={50}
            alt="소환사 아이콘"
          />
          <div className="absolute bg-level-bg text-white text-xs py-[1px] px-[7px] rounded-[12px] x-center bottom-[-20%]">
            <span className="text-xs">{summonerLevel}</span>
          </div>
        </div>
      </div>
      {/* 라이엇 아이디 영역 */}
      <div className="ml-sm flex-1 shrink-0">
        <div className="font-bold">
          <span>{riotId.name}</span>
          <span className="text-opgg-gray-text"> {tag}</span>
        </div>
        <div>
          <span className="text-sm">KR</span>
        </div>
      </div>
      {/* 랭크 영역 */}
      <div className="flex items-center ml-auto pc:flex-1 justify-center">
        {league1 && (
          <>
            <div className="size-[50px] flex items-center justify-center rounded-full bg-[#f7f7f9]">
              <Image
                className="w-[30px]"
                src={matchingTierImg(league1.tier)}
                width={30}
                height={30}
                alt={league1.tier}
              ></Image>
            </div>
            <div className="min-w-[100px] mo:hidden ml-xs text-sm flex flex-col ">
              <span className="font-bold">{league1.tier}</span>
              <span className="text-opgg-gray-text">
                {league1.leaguePoints} LP
              </span>
            </div>
          </>
        )}
      </div>
      {/* 마지막 조회시간 영역 */}
      <div className="flex-1 flex justify-end mo:hidden">
        <span className="text-sm text-opgg-gray-text">
          {calculatedTimeDiffer(lastRequestTime)}
        </span>
      </div>
    </div>
  );
}

export default RecentSearchedSummoner;
