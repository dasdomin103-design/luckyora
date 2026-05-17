import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGameBySlug, getRelatedGames } from "@/lib/games";
import { GameSchema, FAQSchema, BreadcrumbSchema, GameMetaTags } from "@/lib/seo";
import { notFound } from "next/navigation";

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: GamePageProps): Promise<Metadata> {
  const params = await props.params;
  const game = getGameBySlug(params.slug);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  const metaTags = GameMetaTags(game, "https://luckyora.live");

  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    canonicalUrl: metaTags.canonical,
    openGraph: {
      title: metaTags.ogTitle,
      description: metaTags.ogDescription,
      images: [metaTags.ogImage],
      url: metaTags.ogUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTags.twitterTitle,
      description: metaTags.twitterDescription,
      images: [metaTags.twitterImage],
    },
  };
}

export default async function GamePage(props: GamePageProps) {
  const params = await props.params;
  const game = getGameBySlug(params.slug);

  if (!game) {
    notFound();
  }

  const relatedGames = getRelatedGames(params.slug, 4);

  const gameSchema = GameSchema(game, `https://luckyora.live/games/${params.slug}`);

  const breadcrumbSchema = BreadcrumbSchema([
    { name: "Home", url: "https://luckyora.live" },
    { name: "Games", url: "https://luckyora.live/games" },
    { name: game.category, url: `https://luckyora.live/categories/${game.category}` },
    { name: game.title, url: `https://luckyora.live/games/${params.slug}` },
  ]);

  const faqSchema = FAQSchema([
    {
      question: `How do I play ${game.title}?`,
      answer: `To play ${game.title}, simply click the game above. ${game.controls}`,
    },
    {
      question: `Is ${game.title} free?`,
      answer: `Yes, ${game.title} is completely free to play on Luckyora. No downloads or registration required.`,
    },
    {
      question: `What is the difficulty level of ${game.title}?`,
      answer: `${game.title} is a ${game.difficulty} difficulty game. ${game.difficulty === "easy" ? "Perfect for beginners!" : game.difficulty === "medium" ? "Good for intermediate players." : "Challenging for experienced gamers."}`,
    },
    {
      question: `Can I play ${game.title} on mobile?`,
      answer: `Yes, ${game.title} works on desktop, tablet, and mobile devices. Simply open this page in your browser.`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white">
        {/* Breadcrumb Navigation */}
        <nav className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/games" className="hover:text-white">
            Games
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/categories/${game.category}`} className="hover:text-white">
            {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{game.title}</span>
        </nav>

        {/* Game Header */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Game Info */}
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{game.title}</h1>

              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-lg font-semibold">{game.rating}/5</span>
                </div>
                <div>
                  <span className="text-gray-400">
                    {(game.plays / 1000000).toFixed(1)}M+ plays
                  </span>
                </div>
                <div>
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                    {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-6">{game.description}</p>

              {/* Controls Section */}
              <div className="bg-slate-800 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2">Controls</h3>
                <p className="text-gray-300">{game.controls}</p>
              </div>

              {/* Developer Info */}
              <div className="text-sm text-gray-400 mb-6">
                <p>
                  <strong>Developer:</strong> {game.developer}
                </p>
                <p>
                  <strong>Released:</strong> {new Date(game.releaseDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Game Stats Sidebar */}
            <div className="bg-slate-800 rounded-lg p-6 h-fit">
              <h3 className="text-lg font-semibold mb-4">Game Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Category</p>
                  <p className="text-white font-semibold capitalize">{game.category}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Rating</p>
                  <p className="text-white font-semibold">{game.rating}/5.0</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Plays</p>
                  <p className="text-white font-semibold">
                    {(game.plays / 1000000).toFixed(1)}M+
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Difficulty</p>
                  <p className="text-white font-semibold capitalize">{game.difficulty}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Iframe */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="relative w-full bg-black rounded-lg overflow-hidden border border-slate-700">
            <div className="relative w-full pb-[56.25%]">
              <iframe
                src={game.iframeUrl}
                title={game.title}
                className="absolute top-0 left-0 w-full h-full border-none"
                allowFullScreen
                loading="lazy"
                sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <details className="cursor-pointer">
                <summary className="text-lg font-semibold">
                  How do I play {game.title}?
                </summary>
                <p className="text-gray-300 mt-4">
                  To play {game.title}, simply click the game above. {game.controls}
                </p>
              </details>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <details className="cursor-pointer">
                <summary className="text-lg font-semibold">
                  Is {game.title} free?
                </summary>
                <p className="text-gray-300 mt-4">
                  Yes, {game.title} is completely free to play on Luckyora. No downloads or
                  registration required.
                </p>
              </details>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <details className="cursor-pointer">
                <summary className="text-lg font-semibold">
                  Can I play {game.title} on mobile?
                </summary>
                <p className="text-gray-300 mt-4">
                  Yes, {game.title} works on desktop, tablet, and mobile devices. Simply
                  open this page in your browser.
                </p>
              </details>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <details className="cursor-pointer">
                <summary className="text-lg font-semibold">
                  What is the difficulty level of {game.title}?
                </summary>
                <p className="text-gray-300 mt-4">
                  {game.title} is a {game.difficulty} difficulty game.{" "}
                  {game.difficulty === "easy"
                    ? "Perfect for beginners!"
                    : game.difficulty === "medium"
                      ? "Good for intermediate players."
                      : "Challenging for experienced gamers."}
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Related Games Section */}
        {relatedGames.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">Related Games</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedGames.map((relatedGame) => (
                <Link
                  key={relatedGame.id}
                  href={`/games/${relatedGame.slug}`}
                  className="group bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-700 transition"
                >
                  <div className="relative w-full pb-[100%]">
                    <Image
                      src={relatedGame.thumbnail}
                      alt={relatedGame.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedGame.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-yellow-400">★</span>
                      <span>{relatedGame.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Legal Notice */}
        <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-900 rounded-lg mb-12">
          <p className="text-center text-gray-400 text-sm">
            ⚠️ <strong>Important Notice:</strong> This platform does not offer real-money
            gaming, gambling, or financial rewards. All games are for entertainment purposes only.
          </p>
        </div>
      </main>
    </>
  );
}
