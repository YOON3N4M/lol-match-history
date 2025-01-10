import { Flex } from "@chakra-ui/react";

import RecentSearched from "./RecentSearched/RecentSearched";
import MainSearchSection from "./MainSearchSection";

export default function MainContainer() {
  return (
    <div className="flex flex-col min-h-screen bg-opgg-blue">
      <div className="inner">
        <MainSearchSection />
        <RecentSearched />
      </div>
    </div>
  );
}
