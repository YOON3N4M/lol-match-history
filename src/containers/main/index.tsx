import MainSummonerSearch from "./MainSummonerSearch";
import RecentSearchedSummonerList from "./RecentSearchedSummonerList";

export default function MainContainer() {
  return (
    <main className="flex min-h-screen flex-col bg-[#5383e8]">
      <MainSummonerSearch />
      <RecentSearchedSummonerList />
    </main>
  );
}
