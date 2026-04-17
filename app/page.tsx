import Link from 'next/link'
import { games } from './data/games'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      <h1 className="text-4xl font-bold text-center mb-10">
        ?? Luckyora Games
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {games.map((game) => {
          const slug = String(game.slug)

          return (
            <div key={slug} className="bg-gray-800 p-4 rounded-xl">
              <h2 className="text-lg mb-2">{game.title}</h2>

              <Link href={"/game/" + slug}>
                <button className="w-full bg-blue-600 py-2 rounded">
                  Play
                </button>
              </Link>
            </div>
          )
        })}

      </div>

    </main>
  )
}
