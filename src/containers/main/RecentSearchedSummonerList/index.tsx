import { getRecentSearches } from "@/service/firebase-admin/recent-searches.service";
import RecentSearchedSummonerItem from "./RecentSearchedSummonerItem";

export default async function RecentSearchedSummonerList() {
  const recentlyUser = await getRecentlyUser();

  return (
    <section className="content-layout mt-[50px] flex max-h-[500px] flex-col overflow-hidden rounded bg-white shadow-md">
      <div className="w-full px-[15px] py-2.5">
        <p className="font-bold">최근 갱신 (KR)</p>
      </div>
      <div className="flex-1 overflow-y-scroll">
        {recentlyUser.map((user) => (
          <RecentSearchedSummonerItem key={user.puuid} user={user} />
        ))}
      </div>
    </section>
  );
}

async function getRecentlyUser() {
  try {
    return await getRecentSearches(20);
  } catch (error) {
    console.error("최근 검색 유저 조회에 실패했습니다.", error);
    return [];
  }
}
