export interface Game {
  slug: string;
  title: string;
  category: "Arcade" | "Puzzle" | "Strategy" | "Action" | "Multiplayer";
  thumbnail: string;
  url: string;
  trending: boolean;
  description: string;
  players: number;
}

export const games: Game[] = [
  {
    slug: "2048",
    title: "2048",
    category: "Puzzle",
    thumbnail: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=300&fit=crop",
    url: "https://play2048.co/",
    trending: true,
    description: "Merge tiles to reach 2048",
    players: 125000
  },
  {
    slug: "snake",
    title: "Snake",
    category: "Arcade",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    url: "https://snake-game.js.org/",
    trending: true,
    description: "Classic snake game",
    players: 89000
  },
  {
    slug: "tetris",
    title: "Tetris",
    category: "Puzzle",
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop",
    url: "https://tetris.com/play-tetris",
    trending: true,
    description: "The classic block puzzle",
    players: 156000
  },
  {
    slug: "chess",
    title: "Chess",
    category: "Strategy",
    thumbnail: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop",
    url: "https://lichess.org/",
    trending: true,
    description: "Master the board",
    players: 78000
  },
  {
    slug: "tic-tac-toe",
    title: "Tic Tac Toe",
    category: "Strategy",
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop",
    url: "https://playtictactoe.org/",
    trending: false,
    description: "Classic X and O",
    players: 45000
  },
  {
    slug: "pacman",
    title: "Pac-Man",
    category: "Arcade",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    url: "https://pacman.live/",
    trending: true,
    description: "Eat dots, avoid ghosts",
    players: 112000
  },
  {
    slug: "sudoku",
    title: "Sudoku",
    category: "Puzzle",
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop",
    url: "https://sudoku.com/",
    trending: false,
    description: "Number puzzle challenge",
    players: 67000
  },
  {
    slug: "solitaire",
    title: "Solitaire",
    category: "Puzzle",
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop",
    url: "https://www.solitr.com/",
    trending: false,
    description: "Classic card game",
    players: 54000
  },
  {
    slug: "minesweeper",
    title: "Minesweeper",
    category: "Puzzle",
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop",
    url: "https://minesweeper.online/",
    trending: false,
    description: "Find the mines",
    players: 38000
  },
  {
    slug: "flappy-bird",
    title: "Flappy Bird",
    category: "Arcade",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    url: "https://flappybird.io/",
    trending: true,
    description: "Tap to fly",
    players: 145000
  },
  {
    slug: "temple-run",
    title: "Temple Run 2",
    category: "Action",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    url: "https://poki.com/en/g/temple-run-2",
    trending: true,
    description: "Endless runner adventure",
    players: 198000
  },
  {
    slug: "subway-surfers",
    title: "Subway Surfers",
    category: "Action",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    url: "https://poki.com/en/g/subway-surfers",
    trending: true,
    description: "Surf the subways",
    players: 234000
  },
  {
    slug: "cut-the-rope",
    title: "Cut the Rope",
    category: "Puzzle",
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop",
    url: "https://poki.com/en/g/cut-the-rope",
    trending: false,
    description: "Feed Om Nom",
    players: 87000
  },
  {
    slug: "fruit-ninja",
    title: "Fruit Ninja",
    category: "Arcade",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    url: "https://poki.com/en/g/fruit-ninja",
    trending: false,
    description: "Slice the fruits",
    players: 92000
  },
  {
    slug: "angry-birds",
    title: "Angry Birds",
    category: "Arcade",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    url: "https://poki.com/en/g/angry-birds",
    trending: true,
    description: "Knock down the pigs",
    players: 167000
  },
  {
    slug: "candy-crush",
    title: "Candy Crush",
    category: "Puzzle",
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop",
    url: "https://poki.com/en/g/candy-crush",
    trending: true,
    description: "Match colorful candies",
    players: 189000
  },
  {
    slug: "checkers",
    title: "Checkers",
    category: "Strategy",
    thumbnail: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop",
    url: "https://www.247checkers.com/",
    trending: false,
    description: "Classic board game",
    players: 29000
  },
  {
    slug: "reversi",
    title: "Reversi",
    category: "Strategy",
    thumbnail: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop",
    url: "https://www.gamesforthebrain.com/game/reversi/",
    trending: false,
    description: "Flip your opponent's pieces",
    players: 22000
  },
  {
    slug: "connect-four",
    title: "Connect Four",
    category: "Strategy",
    thumbnail: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop",
    url: "https://www.gamesforthebrain.com/game/connect4/",
    trending: false,
    description: "Connect 4 in a row",
    players: 41000
  },
  {
    slug: "wordle",
    title: "Wordle",
    category: "Puzzle",
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop",
    url: "https://www.nytimes.com/games/wordle/index.html",
    trending: true,
    description: "Guess the word",
    players: 134000
  },
  {
    slug: "crossword",
    title: "Crossword",
    category: "Puzzle",
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop",
    url: "https://www.nytimes.com/crosswords",
    trending: false,
    description: "Classic crossword puzzles",
    players: 56000
  },
  {
    slug: "uno",
    title: "UNO Online",
    category: "Multiplayer",
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop",
    url: "https://www.247games.com/card-games/",
    trending: true,
    description: "Play UNO with friends",
    players: 103000
  },
  {
    slug: "8-ball-pool",
    title: "8 Ball Pool",
    category: "Multiplayer",
    thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop",
    url: "https://poki.com/en/g/8-ball-pool",
    trending: true,
    description: "Classic pool game",
    players: 156000
  },
  {
    slug: "basketball-stars",
    title: "Basketball Stars",
    category: "Multiplayer",
    thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    url: "https://poki.com/en/g/basketball-stars",
    trending: true,
    description: "1v1 basketball showdown",
    players: 178000
  }
];

export const categories = ["All", "Arcade", "Puzzle", "Strategy", "Action", "Multiplayer"] as const;

export type Category = (typeof categories)[number];
