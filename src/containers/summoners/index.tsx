import SummonerBody from "@/containers/summoners/summonerBody/SummonerBody";
import SummonerHead from "@/containers/summoners/summonersHead/SummonerHead";
import { RiotAccountDto, SummonerDto } from "@/types/riot-dto";

interface SummonersContainerProps {
  account: RiotAccountDto;
  summoner: SummonerDto;
}
export default function SummonersContainer(props: SummonersContainerProps) {
  const { account, summoner } = props;

  return (
    <div>
      <SummonerHead account={account} summoner={summoner} />
      <SummonerBody />
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
