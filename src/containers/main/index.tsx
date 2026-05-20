"use client";

import SearchInput from "@/components/SearchInput";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import RecentSearched from "./RecentSearched";
import { SubmitEvent, useState } from "react";
import { fetchRiotAccount } from "@/service/api/client";
import MainSearch from "./MainSearch";

export default function MainContainer() {
  return (
    <main className="min-h-screen flex flex-col bg-[#5383e8]">
      <MainSearch />
      {/* <Flex as={"section"} m="0 auto">
        <RecentSearched />
      </Flex> */}
    </main>
  );
}
