export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  coins: number;
  totalEarned: number;
  gamesPlayed: number;
  wins: number;
  winRate: number;
  createdAt: string;
}

export interface LeaderboardResponse {
  success: boolean;
  data: LeaderboardEntry[];
  total: number;
  page: number;
  limit: number;
}

export type LeaderboardPeriod = "daily" | "weekly" | "monthly" | "alltime";

export type LeaderboardCategory = "coins" | "wins" | "winRate" | "gamesPlayed"; 

