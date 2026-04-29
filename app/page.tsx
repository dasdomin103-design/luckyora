export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">

      {/* Hero Section */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Play Free Online Games
      </h1>

      <p className="text-gray-400 mb-10 text-center max-w-xl">
        Enjoy 100+ HTML5 games instantly. No downloads, no signups.
      </p>

      {/* ? AdSense SAFE STATS (REALISTIC) */}
      <div className="flex gap-10 text-center">
        <div>
          <h2 className="text-3xl font-bold">100+</h2>
          <p className="text-gray-400">Free Games</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">No Download</h2>
          <p className="text-gray-400">Play Instantly</p>
        </div>
      </div>

    </main>
  );
}
