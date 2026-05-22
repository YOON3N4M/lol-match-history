import type { ParticipantDto } from "./participant.dto";

/**
 * ParticipantDto를 확장하여
 * 해당 서비스 내 필요한 형태로 가공된 데이터
 */
export interface MatchParticipantWithStats extends ParticipantDto {
  kda: string;
  teamKills: number;
  killParticipation: number;
  csCount: number;
  csPerMinute: string | null;
  itemList: number[];
}

/**
 * createMatchParticipantsSummary의 반환 값
 */
export interface MatchParticipantsSummary {
  participants: MatchParticipantWithStats[];
  blueTeam: MatchParticipantWithStats[];
  redTeam: MatchParticipantWithStats[];
  participantsByPuuid: Record<string, MatchParticipantWithStats>;
}
