import { SUMMONER_PROFILE_ICON_URL } from "@/constants/riot";
import { RecentSearchUser } from "@/service/firebase-admin/recent-searches/types";
import { calculatedTimeDiffer } from "@/utils";
import { getRankEmblemSrc, romeNumToArabNum } from "@/utils/riot";
import Link from "next/link";

export default function RecentSearchedSummonerItem(props: {
  user: RecentSearchUser;
}) {
  const { user } = props;

  const tier = user.soloRank
    ? user.soloRank.tier.toLowerCase().charAt(0).toUpperCase() +
      user.soloRank.tier.toLowerCase().substring(1)
    : undefined;

  const rank = user.soloRank ? romeNumToArabNum(user.soloRank.rank) : undefined;

  return (
    <Link
      href={`/summoners/kr/${encodeURIComponent(`${user.gameName}-${user.tagLine}`)}`}
      className="relative flex w-full items-center border-b px-5 py-2.5 hover:bg-[#f7f7f9]"
    >
      {/* 아이콘, 닉네임 */}
      <div className="flex w-[300px] items-center">
        <div className="relative h-[50px] w-[50px] rounded">
          <img
            src={SUMMONER_PROFILE_ICON_URL(user.profileIconId)}
            alt={`${user.gameName} profile icon`}
          />

          <span className="absolute bottom-0 x-center translate-y-1/2 rounded-xl bg-[rgb(28,28,31)] px-2 text-[10px] text-white">
            {user.summonerLevel}
          </span>
        </div>
        <div className="ml-2.5 max-w-[180px] min-w-[180px] overflow-hidden">
          <p className="font-extrabold">
            {user.gameName}{" "}
            <span className="inline text-[#9AA4AF]">#{user.tagLine}</span>
          </p>
          <p className="text-sm">KR</p>
        </div>
      </div>
      {/* 티어 */}
      <div className="flex flex-1 justify-start pl-[15%]">
        <div className="hidden items-center md:flex">
          {user.soloRank && (
            <>
              <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#f7f7f9]">
                <div className="w-[30px]">
                  <img
                    src={getRankEmblemSrc(user.soloRank.tier)}
                    alt={`${user.soloRank.tier} tier icon`}
                  />
                </div>
              </div>
              <div className="ml-2 min-w-[100px] text-sm">
                <div>
                  <p className="font-bold">
                    {tier} {rank}
                  </p>
                </div>
                <p className="font-semibold text-[#9AA4AF]">
                  {user.soloRank.leaguePoints}LP
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 시간 */}

      <div className="flex w-[200px] justify-end">
        <span className="text-sm text-[#9AA4AF]">
          {calculatedTimeDiffer(user.lastSearchedAt)}
        </span>
      </div>
    </Link>
  );
}
