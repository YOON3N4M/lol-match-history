"use client";

import SearchInput from "@/components/SearchInput";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

export default function MainSearch() {
  return (
    <div className="flex w-[800px] h-[60px] bg-white rounded-[30px] shadow-md justify-between items-center mx-auto p-1">
      <Box w={{ pc: "234px", mo: "80px" }} h="40px" pl={{ pc: 4, mo: 2 }}>
        <Box as="label" display={"block"} fontSize="xs" fontWeight={700}>
          Region
        </Box>
        <Text color={"keyColor.gray"} fontSize="sm">
          Korea
        </Text>
      </Box>
      <Divider orientation="vertical" h={"40%"} mr={{ pc: 8, mo: 4 }} />
      <Box position="relative" flex={1}>
        <Box as="label" display={"block"} fontSize="xs" fontWeight={700}>
          Search
        </Box>
        <SearchInput />
      </Box>
      <Box as="button" color={"keyColor.sky"} fontWeight={700} fontSize="2xl">
        .GG
      </Box>
    </div>
  );
}
