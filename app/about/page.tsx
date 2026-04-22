export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">About Luckyora</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-400 text-lg mb-6">
            Luckyora is a free online gaming platform dedicated to providing high-quality, 
            skill-based games to players worldwide. Our mission is to make gaming accessible 
            to everyone without requiring downloads, signups, or payments.
          </p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Story</h2>
          <p className="text-slate-400 mb-6">
            Founded in 2024, Luckyora started with a simple idea: create a platform where 
            anyone can instantly play great games without barriers. Today, we host over 100 
            games across multiple genres and serve millions of players monthly.
          </p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Values</h2>
          <ul className="text-slate-400 space-y-2 list-disc list-inside">
            <li><strong className="text-white">Accessibility:</strong> Gaming should be free and available to everyone</li>
            <li><strong className="text-white">Quality:</strong> We curate only the best games for our platform</li>
            <li><strong className="text-white">Fair Play:</strong> All games are skill-based with no gambling elements</li>
            <li><strong className="text-white">Community:</strong> We build features that bring players together</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">100% Free, Always</h2>
          <p className="text-slate-400">
            Luckyora will always be free to play. We believe that great gaming experiences 
            shouldn't come with a price tag. No hidden fees, no premium subscriptions, 
            just pure gaming fun.
          </p>
        </div>
      </div>
    </div>
  );
}

