export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  coins: number;
  totalEarned: number;
  gamesPlayed: number;
  wins: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface RewardResponse {
  success: boolean;
  message: string;
  awarded?: number;
  newBalance?: number;
  cooldownRemaining?: number;
  dailyRewardsUsed?: number;
  dailyLimit?: number;
}

export interface RewardStatus {
  success: boolean;
  balance: number;
  cooldownRemaining: number;
  canWatch: boolean;
  dailyRewardsUsed: number;
  dailyLimit: number;
}

export type GameType = "ludo" | "carrom" | "chess" | "pool";

export type GameStatus = "waiting" | "active" | "completed" | "cancelled";

export interface Game {
  id: string;
  type: GameType;
  status: GameStatus;
  players: User[];
  winner?: User;
  startedAt?: string;
  endedAt?: string;
  createdAt: string;
}

export interface Tournament {
  id: string;
  name: string;
  game: GameType;
  status: GameStatus;
  maxPlayers: number;
  currentPlayers: number;
  prizePool: number;
  entryFee: number;
  startTime: string;
  endTime?: string;
  winner?: User;
  createdAt: string;
}

