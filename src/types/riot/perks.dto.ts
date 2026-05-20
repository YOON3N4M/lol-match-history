export interface PerksDto {
  statPerks: PerkStatsDto;
  styles: PerkStyleDto[];
}

interface PerkStatsDto {
  defense: number;
  flex: number;
  offense: number;
}

interface PerkStyleDto {
  description: string;
  selections: PerkStyleSelectionDto[];
  style: number;
}

interface PerkStyleSelectionDto {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}
