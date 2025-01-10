import MainSearchSection from "./MainSearchSection";
import RecentSearchedSummonerList from "./RecentSearchedSummonerList";

export default function MainContainer() {
  return (
    <div className="flex flex-col min-h-screen bg-opgg-blue">
      <div className="inner">
        <MainSearchSection />
        <RecentSearchedSummonerList />
      </div>
    </div>
  );
}
