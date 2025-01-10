import { Flex } from "@chakra-ui/react";

import RecentSearched from "./RecentSearched/RecentSearched";
import MainSearchSection from "./MainSearchSection";

export default function MainContainer() {
  return (
    <div className="flex flex-col min-h-screen bg-[#5383e8]">
      <MainSearchSection />
      <Flex as={"section"} m="0 auto">
        <RecentSearched />
      </Flex>
    </div>
  );
}
