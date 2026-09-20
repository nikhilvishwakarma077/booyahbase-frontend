export interface IOrganizerSummary {
  _id: string;
  name: string;
  isVerified: boolean;
}

export interface IPrizeDistribution {
  position: string;
  amount: number;
}


export interface IScrimVariant {
  entryFee: number;
  prizePool: number;
  matches: number;
  totalSlots: number;
  availableSlots: number;

  prizeDistribution: IPrizeDistribution[];

  live: boolean;
  caster: string | null;

  championRush: boolean;
  championRushPoints: number | null;

  teamLogo: boolean;
}

export interface IScrim {
  _id: string;

  name: string;

  organizerId: IOrganizerSummary;

  date: string;
  time: string;

  format: "Solo" | "Duo" | "Squad";
  tier: "T1" | "T2" | "T3";

  whatsappNumber: string;

  variants: IScrimVariant[];

  rules: string;
  importantInformation?: string;

  published: boolean;

  createdAt: string;
  updatedAt: string;
}