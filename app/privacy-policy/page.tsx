export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-slate-400 mb-6">
            Luckyora is committed to protecting your privacy. We collect minimal information 
            necessary to provide our gaming services:
          </p>
          <ul className="text-slate-400 space-y-2 list-disc list-inside mb-6">
            <li>Game scores and leaderboard data (if you choose to submit)</li>
            <li>Basic usage analytics to improve our platform</li>
            <li>Email address (only if you contact us)</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-slate-400 mb-6">
            We use your information solely to:
          </p>
          <ul className="text-slate-400 space-y-2 list-disc list-inside mb-6">
            <li>Provide and maintain our gaming services</li>
            <li>Display leaderboards and player rankings</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Improve our platform based on usage patterns</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Data Security</h2>
          <p className="text-slate-400 mb-6">
            We implement industry-standard security measures to protect your data. 
            All data is stored securely using Supabase&apos;s enterprise-grade infrastructure.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Third-Party Services</h2>
          <p className="text-slate-400 mb-6">
            We use the following third-party services:
          </p>
          <ul className="text-slate-400 space-y-2 list-disc list-inside mb-6">
            <li><strong className="text-white">Supabase:</strong> For database and authentication services</li>
            <li><strong className="text-white">Vercel:</strong> For hosting and analytics</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Your Rights</h2>
          <p className="text-slate-400 mb-6">
            You have the right to:
          </p>
          <ul className="text-slate-400 space-y-2 list-disc list-inside mb-6">
            <li>Access your personal data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of analytics tracking</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Contact Us</h2>
          <p className="text-slate-400">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@luckyora.com" className="text-blue-400 hover:underline">
              privacy@luckyora.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}

