import LoadingSpinner from "@/components/LoadingSpinner";
import SummonerBody from "@/containers/sumonners/summonerBody/SummonerBody";
import SummonerHead from "@/containers/sumonners/summonersHead/SummonerHead";
import useSummoner from "@/hooks/useSummoner";
import { useSummonerActions, useUserDocument } from "@/store/summonersStore";
import { extractSummonerName, handleRiotId } from "@/utils";
import { Box, Center } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ContainerSummoners() {
  const pathname = usePathname();

  const { refreshActions, isFetchLoading } = useSummoner();

  const userDocument = useUserDocument();
  const { setRiotId, setUserDocument, setMatchHistory } = useSummonerActions();

  function extractRiotIdFromUrl(currentPathname: string) {
    const sumonnerName = extractSummonerName(currentPathname);
    const riotId = handleRiotId(sumonnerName, "-");
    return riotId;
  }

  function initState() {
    setRiotId(null);
    setUserDocument(null);
    setMatchHistory(null);
  }

  useEffect(() => {
    if (!pathname) return;
    initState();
    setRiotId(extractRiotIdFromUrl(pathname));
  }, [pathname]);

  useEffect(() => {
    //  console.log(userDocument);
  }, [userDocument]);

  useEffect(() => {
    return () => {
      initState();
    };
  }, []);

  return (
    <Center flexDirection={"column"} pb={8}>
      {userDocument && (
        <>
          <SummonerHead refreshActions={refreshActions} />
          <Box
            display={{ pc: "flex", mo: "none" }}
            className="tab"
            w="100%"
            h={"50px"}
            bg="white"
            borderTop={"1px solid"}
            borderColor="keyColor.border"
          ></Box>
          {!isFetchLoading ? <SummonerBody /> : <LoadingSpinner />}
        </>
      )}
    </Center>
  );
}
