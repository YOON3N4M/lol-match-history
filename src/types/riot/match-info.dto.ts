import { ParticipantDto } from "./participant.dto";

export interface MatchInfoDto {
  participants: ParticipantDto[];
  endOfGameResult: string;
  queueId: number;
  gameCreation: number;
  gameDuration: number;
}
