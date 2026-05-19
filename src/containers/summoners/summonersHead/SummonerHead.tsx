"use client";

import { SUMMONER_PROFILE_ICON_URL } from "@/constants/riot/asset-url";
import { RiotAccountDto, SummonerDto } from "@/types/riot-dto";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

interface SummonerHeadProps {
  account: RiotAccountDto;
  summoner: SummonerDto;
  // refreshActions: () => Promise<void>;
}

export default function SummonerHead(props: SummonerHeadProps) {
  const { account, summoner } = props;

  const { gameName, tagLine } = account;
  const { profileIconId, summonerLevel } = summoner;

  // function handleRefresh() {
  //   const currentTime = new Date().getTime();
  //   const timeDiffer = Math.abs((lastRequestTime - currentTime) / 1000);
  //   const timeLimit = 180;
  //   const remainTime = Math.floor(timeLimit - timeDiffer);

  //   if (timeDiffer < timeLimit) {
  //     alert(`전적 갱신은 180초마다 가능합니다. ${remainTime}초 남았습니다.`);
  //   } else {
  //     refreshActions();
  //   }
  // }

  return (
    <>
      <Flex w={"100%"} bg="white" px={{ mo: 4 }}>
        <Flex m="0 auto" w="100%" maxW={"1080px"} py={12} justifyContent={{ mo: "space-around", pc: "start" }}>
          <Box className="head-left">
            <Box py={4}>
              <Box position={"relative"}>
                <Box
                  position={"absolute"}
                  bg="rgb(32, 45, 55)"
                  color={"white"}
                  zIndex={100}
                  p="2px 12px"
                  fontSize={"xs"}
                  top={"90%"}
                  left="50%"
                  transform={"translateX(-50%)"}
                  borderRadius="10px"
                  fontWeight={700}
                >
                  {summonerLevel}
                </Box>
                <Box position={"relative"} w="100px" h="100px" borderRadius={"20px"} overflow="hidden">
                  <Image alt="summoner-icon" fill={true} src={SUMMONER_PROFILE_ICON_URL(profileIconId)} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="head-right" ml={{ pc: 6, mo: 6 }}>
            <Heading fontSize={"2xl"}>
              {" "}
              {gameName}{" "}
              <Text ml={2} display={"inline"} color="keyColor.gray">
                #{tagLine}
              </Text>
            </Heading>{" "}
            <Box display={{ mo: "flex", pc: "block" }} flexDirection={"column"} mt={12}>
              {/* <Button bg="keyColor.bgSky" color={"white"} onClick={handleRefresh}>
                전적 갱신
              </Button> */}
              {/* firebase 정상화 될때까지 주석처리 */}
              {/* <Text
                mt={2}
                fontSize={"xs"}
                fontWeight="600"
                color={"keyColor.gray"}
                textAlign={{ pc: "initial", mo: "right" }}
              >
                최근 업데이트: {calculatedTimeDiffer(lastRequestTime)}
              </Text> */}
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
