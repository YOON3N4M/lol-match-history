import SummonerBody from "@/containers/summoners/summonerBody";
import SummonerHead from "@/containers/summoners/summonersHead";
import type { RiotAccountDto, SummonerDto } from "@/types/riot";

interface SummonersContainerProps {
  account: RiotAccountDto;
  summoner: SummonerDto;
}
export default function SummonersContainer(props: SummonersContainerProps) {
  const { account, summoner } = props;

  return (
    <div>
      <SummonerHead account={account} summoner={summoner} />
      <SummonerBody account={account} summoner={summoner} />
      {/* {userDocument && (
        <>
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
      )} */}
    </div>
  );
}
