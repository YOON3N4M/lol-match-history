import { RiotId, UserDocument } from "@/types/types";
import { calculatedTimeDiffer } from "@/utils";

import { handleRiotId, matchingTierImg, romeNumToArabNum } from "@/utils/riot";
import { firebaseAPI } from "@/service/firebase";
import { useEffect, useState } from "react";
import { SUMMONER_PROFILE_ICON_URL } from "@/constants/riot/asset-url";
import { useRouter } from "next/navigation";

export default function RecentSearched() {
  const [recentlyUser, setRecentlyUser] = useState<UserDocument[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 최근 검색된 모든 플레이어 doc 가져옴
    async function getCollection() {
      const collection = await firebaseAPI.getUserCollection();
      const sortByLastRequestTime = collection
        .slice()
        .sort((a: UserDocument, b: UserDocument) => b.lastRequestTime - a.lastRequestTime);
      setRecentlyUser(sortByLastRequestTime);
    }

    getCollection();
  }, []);

  function handleSummonerClick(riotId: RiotId) {
    router.push(`summoners/kr/${riotId.name}-${riotId.tag}`);
  }

  return (
    <section className="relative mt-[50px] max-h-[500px] w-full overflow-hidden rounded bg-white shadow-md md:w-[1024px]">
      <div className="w-full px-[15px] py-2.5">
        <p className="font-bold">최근 갱신 (KR)</p>
      </div>
      <div className="styled-scroll h-[400px] overflow-y-scroll">
        {recentlyUser.map((user) => (
          <RecentSearchedUser key={user.puuid} user={user} onClick={handleSummonerClick} />
        ))}
      </div>
    </section>
  );
}

function RecentSearchedUser(props: { user: UserDocument; onClick: (riotId: RiotId) => void }) {
  const { user, onClick } = props;

  if (!user.riotId) return <div />;

  const riotId = handleRiotId(user.riotId, "#");
  const tier = user.league1
    ? user.league1.tier.toLowerCase().charAt(0).toUpperCase() + user.league1.tier.toLowerCase().substring(1)
    : undefined;
  const rank = user.league1 ? romeNumToArabNum(user.league1.rank) : undefined;

  return (
    <button
      type="button"
      className="relative flex w-full cursor-pointer items-center border-b border-[#ebeef1] px-5 py-2.5 text-left hover:bg-[#f7f7f9]"
      onClick={() => onClick(riotId)}
    >
      <div className="summoner-icon">
        <div className="relative h-[50px] w-[50px] rounded">
          <img src={SUMMONER_PROFILE_ICON_URL(user.profileIconId)} alt={`${riotId.name} profile icon`} />
          <div className="summoner-level x-center absolute top-[80%] rounded-xl bg-[rgb(28,28,31)] px-[7px] py-px text-white">
            <span className="text-xs">{user.summonerLevel}</span>
          </div>
        </div>
      </div>
      <div className="riot-id ml-2.5 min-w-[180px] max-w-[180px] overflow-hidden">
        <p className="font-extrabold">
          {riotId.name}{" "}
          <span className="inline text-[#9AA4AF]">
            #{riotId.tag}
          </span>
        </p>
        <p className="text-sm">KR</p>
      </div>
      <div className="rank ml-auto hidden items-center md:flex">
        {user.league1 && (
          <>
            <div className="badge flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#f7f7f9]">
              <div className="w-[30px]">
                <img src={matchingTierImg(user.league1.tier)} alt={`${user.league1.tier} tier icon`} />
              </div>
            </div>
            <div className="point ml-2 min-w-[100px] text-sm">
              <div>
                <p className="font-bold">
                  {tier} {rank}
                </p>
              </div>
              <p className="font-semibold text-[#9AA4AF]">{user.league1.leaguePoints}LP</p>
            </div>
          </>
        )}
      </div>
      <div className="time ml-auto text-sm text-[#9AA4AF]">
        <p>{calculatedTimeDiffer(user.lastRequestTime)}</p>
      </div>
    </button>
  );
}
