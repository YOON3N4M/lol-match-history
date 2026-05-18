"use client";

import { Flex } from "@chakra-ui/react";

import ContainerMain from "@/containers/main/ContainerMain";

export default function Page() {
  return (
    <Flex flexDirection="column" minH="100dvh" bg="#5383e8" pb={10}>
      <ContainerMain />
    </Flex>
  );
}
