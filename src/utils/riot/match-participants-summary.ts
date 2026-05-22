import type { MatchParticipantWithStats, MatchParticipantsSummary, ParticipantDto } from "@/types/riot";
import { getCS, getKDA, getKillParticipationRate } from "./match-stats";

const BLUE_TEAM_ID = 100;
const RED_TEAM_ID = 200;

export function createMatchParticipantsSummary(
  participants: ParticipantDto[],
  gameDuration?: number,
): MatchParticipantsSummary {
  const teamKillsByTeamId = participants.reduce<Record<number, number>>((acc, participant) => {
    acc[participant.teamId] = (acc[participant.teamId] ?? 0) + participant.kills;

    return acc;
  }, {});

  const summary: MatchParticipantsSummary = {
    participants: [],
    blueTeam: [],
    redTeam: [],
    participantsByPuuid: {},
  };

  participants.forEach((participant) => {
    const teamKills = teamKillsByTeamId[participant.teamId] ?? 0;
    const cs = getCS(participant.neutralMinionsKilled, participant.totalMinionsKilled, gameDuration && gameDuration);

    const participantWithStats: MatchParticipantWithStats = {
      ...participant,
      kda: getKDA(participant.kills, participant.deaths, participant.assists),
      teamKills,
      killParticipation: getKillParticipationRate(teamKills, participant.kills, participant.assists),
      csCount: cs.cs,
      csPerMinute: cs.csPerMinute,
      itemList: [
        participant.item0,
        participant.item1,
        participant.item2,
        participant.item3,
        participant.item4,
        participant.item5,
        participant.item6,
      ],
    };

    summary.participants.push(participantWithStats);
    summary.participantsByPuuid[participant.puuid] = participantWithStats;

    if (participant.teamId === BLUE_TEAM_ID) {
      summary.blueTeam.push(participantWithStats);
    }

    if (participant.teamId === RED_TEAM_ID) {
      summary.redTeam.push(participantWithStats);
    }
  });

  return summary;
}
