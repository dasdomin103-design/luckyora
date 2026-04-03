export default function RefundPolicy() {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
        
        <p className="mb-4">At luckyora.live, all payments are processed securely. Please read our refund policy carefully.</p>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">1. Entry Fees</h2>
          <p>All entry fees for games or tournaments are non-refundable once the game has started.</p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">2. Failed Transactions</h2>
          <p className="mb-2">If a payment is deducted but the service is not delivered:</p>
          <ul className="list-disc ml-6">
            <li>The amount will be refunded within 5–7 business days</li>
            <li>Or credited to your wallet (if applicable)</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">3. Duplicate Payments</h2>
          <p>Any duplicate transactions will be refunded after verification.</p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">4. Cancellation</h2>
          <p>Users cannot cancel participation once a game/tournament is joined.</p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">5. Fraudulent Activity</h2>
          <p className="mb-2">Refunds will not be provided if:</p>
          <ul className="list-disc ml-6">
            <li>The user violates terms</li>
            <li>Suspicious or fraudulent activity is detected</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">6. Processing Time</h2>
          <p>Refunds may take 5–10 business days depending on your bank/payment provider.</p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">7. Contact</h2>
          <p>For refund requests, contact: <a href="mailto:support@luckyora.live" className="text-blue-500">support@luckyora.live</a></p>
        </section>
      </div>
    )
  }