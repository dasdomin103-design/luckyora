export default function About() {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">About LuckyOra</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
          <p className="mb-4">
            LuckyOra is a skill-based competitive gaming platform where players can 
            test their abilities, compete with others, and win real rewards. We provide 
            a fair, transparent, and secure environment for competitive gaming enthusiasts.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="mb-4">
            To create the most trusted and engaging skill-based gaming platform in India, 
            where talent meets opportunity and every player gets a fair chance to win.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>100% skill-based games - no luck involved</li>
            <li>Transparent rules and fair play</li>
            <li>Secure payment processing via trusted providers</li>
            <li>Instant withdrawals to your bank account</li>
            <li>24/7 customer support</li>
            <li>Regular tournaments and competitions</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Our Commitment</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Fair Play:</strong> Advanced anti-fraud detection systems</li>
            <li><strong>Security:</strong> Industry-standard encryption and data protection</li>
            <li><strong>Transparency:</strong> Clear rules, visible leaderboards, and honest payouts</li>
            <li><strong>Responsible Gaming:</strong> 18+ only with verified identity</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">1. Sign Up</h3>
              <p>Create your account with basic details (18+ verification required)</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">2. Add Money</h3>
              <p>Securely add money to your wallet via UPI, cards, or net banking</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">3. Join Games</h3>
              <p>Choose from various skill-based tournaments and competitions</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">4. Play & Win</h3>
              <p>Use your skills to compete and win real cash prizes</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">5. Withdraw</h3>
              <p>Instantly withdraw your winnings to your bank account</p>
            </div>
          </div>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">🎯 Skill-Based</h3>
              <p className="text-sm">No gambling - pure skill and strategy</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">🔒 Secure</h3>
              <p className="text-sm">Bank-grade security for all transactions</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">⚡ Fast Payouts</h3>
              <p className="text-sm">Withdraw winnings instantly</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">📱 Mobile Friendly</h3>
              <p className="text-sm">Play anytime, anywhere</p>
            </div>
          </div>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Legal & Compliance</h2>
          <p className="mb-4">
            LuckyOra operates in full compliance with Indian laws. All our games are 
            skill-based and legal under the current regulations. We promote responsible 
            gaming and have strict age verification measures in place.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p>
            Have questions? Reach out to us at:{' '}
            <a href="mailto:support@luckyora.live" className="text-blue-500 underline">
              support@luckyora.live
            </a>
          </p>
        </section>
      </div>
    )
  }