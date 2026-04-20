"use client";

const games = [
  { name: "Subway Surfers", url: "https://www.crazygames.com/game/subway-surfers" },
  { name: "Moto X3M", url: "https://www.crazygames.com/game/moto-x3m" },
  { name: "Stickman Hook", url: "https://poki.com/en/g/stickman-hook" },
  { name: "Temple Run 2", url: "https://poki.com/en/g/temple-run-2" },
  { name: "Drift Hunters", url: "https://www.crazygames.com/game/drift-hunters" }
];

export default function GamesPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>?? Play Free Games</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "12px"
      }}>
        {games.map((game, index) => (
          <button
            key={index}
            onClick={() => window.open(game.url, "_blank")}
            style={{
              padding: "14px",
              background: "#111",
              color: "#fff",
              borderRadius: "10px",
              cursor: "pointer",
              border: "none",
              fontSize: "16px"
            }}
          >
            {game.name}
          </button>
        ))}
      </div>
    </div>
  );
}
