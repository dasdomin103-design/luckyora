export default function Home() {
  const games = [
    { name: '2048', url: 'https://play2048.co/' },
    { name: 'Snake', url: 'https://snake-game.js.org/' },
    { name: 'Tic Tac Toe', url: 'https://playtictactoe.org/' },
    { name: 'Chess', url: 'https://lichess.org/' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold">Luckyora</h1>
        <p className="text-gray-400 mt-2">Play free games online</p>
      </header>
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">{game.name}</h2>
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Play
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
