// ============================================
// Base Types
// ============================================

export type LeaderboardPeriod = "daily" | "weekly" | "monthly" | "alltime";

export type LeaderboardCategory = keyof Pick<
  LeaderboardEntry,
  "coins" | "wins" | "winRate" | "gamesPlayed"
>;

// ============================================
// Core Interface
// ============================================

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  coins: number;
  totalEarned: number;
  gamesPlayed: number;
  wins: number;
  winRate: number; // percentage (0–100)
  createdAt: string; // ISO date string
}

// ============================================
// API Response Types
// ============================================

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface LeaderboardResponse {
  success: boolean;
  data: LeaderboardEntry[];
  meta: PaginationMeta;
  period: LeaderboardPeriod;
  category: LeaderboardCategory;
}

export interface LeaderboardErrorResponse {
  success: false;
  message: string;
  code: number;
}

// ============================================
// Query / Filter Types
// ============================================

export interface LeaderboardQueryParams {
  period?: LeaderboardPeriod;
  category?: LeaderboardCategory;
  page?: number;
  limit?: number;
  search?: string;
}

// ============================================
// State Types (Frontend)
// ============================================

export interface LeaderboardState {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  selectedPeriod: LeaderboardPeriod;
  selectedCategory: LeaderboardCategory;
  meta: PaginationMeta | null;
}

// ============================================
// Helper / Utility Types
// ============================================

export type LeaderboardSortOrder = "asc" | "desc";

export interface LeaderboardSortConfig {
  category: LeaderboardCategory;
  order: LeaderboardSortOrder;
}

export type RankedLeaderboardEntry = LeaderboardEntry & {
  isCurrentUser?: boolean;
  previousRank?: number;
  rankChange?: number; // positive = moved up, negative = moved down
};

// ============================================
// Constants
// ============================================

export const LEADERBOARD_PERIODS: LeaderboardPeriod[] = [
  "daily",
  "weekly",
  "monthly",
  "alltime",
];

export const LEADERBOARD_CATEGORIES: LeaderboardCategory[] = [
  "coins",
  "wins",
  "winRate",
  "gamesPlayed",
];

export const LEADERBOARD_CATEGORY_LABELS: Record<LeaderboardCategory, string> =
  {
    coins: "Coins",
    wins: "Total Wins",
    winRate: "Win Rate",
    gamesPlayed: "Games Played",
  };

export const LEADERBOARD_PERIOD_LABELS: Record<LeaderboardPeriod, string> = {
  daily: "Today",
  weekly: "This Week",
  monthly: "This Month",
  alltime: "All Time",
};

export const DEFAULT_LEADERBOARD_QUERY: LeaderboardQueryParams = {
  period: "alltime",
  category: "coins",
  page: 1,
  limit: 10,
};