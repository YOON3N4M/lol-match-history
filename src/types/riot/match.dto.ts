import type { MatchInfoDto } from "./match-info.dto";
import type { MatchMetadataDto } from "./match-metadata.dto";

export interface MatchDto {
  metadata: MatchMetadataDto;
  info: MatchInfoDto;
}
