import { firebaseAPI } from "@/service/firebase";
import { UserDocument } from "@/types/types";
import { useEffect, useState } from "react";
import RecentSearchedSummoner from "./RecentSearchedSummoner";

export default function RecentSearchedSummonerList() {
  const [recentlyUser, setRecentlyUser] = useState<UserDocument[]>([]);

  useEffect(() => {
    // 최근 검색된 모든 플레이어 doc 가져옴
    async function getCollection() {
      const collection = await firebaseAPI.getUserCollection();
      const sortByLastRequestTime = collection
        .slice()
        .sort(
          (a: UserDocument, b: UserDocument) =>
            b.lastRequestTime - a.lastRequestTime
        );
      setRecentlyUser(sortByLastRequestTime);
    }

    getCollection();
  }, []);

  return (
    <div className="relative mt-[50px] w-full bg-white border rounded-md overflow-hidden shadow-md">
      <div className="py-[10px] px-[15px]">
        <span className="font-bold">최근 갱신 (KR)</span>
      </div>
      <div className="h-[400px] overflow-y-auto scroll">
        {recentlyUser.map((user) => (
          <RecentSearchedSummoner userDocument={user} />
        ))}
      </div>
    </div>
  );
}
