export default function PrivacyPolicy() {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <p className="mb-4">At luckyora.live, we value your privacy and are committed to protecting your personal information.</p>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="mb-2">We may collect:</p>
          <ul className="list-disc ml-6">
            <li>Name, email address, phone number</li>
            <li>Payment details (processed via secure third-party providers)</li>
            <li>Device and usage data (IP address, browser type)</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6">
            <li>To create and manage your account</li>
            <li>To process payments and transactions</li>
            <li>To improve platform performance and user experience</li>
            <li>To prevent fraud and unauthorized activity</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">3. Payment Security</h2>
          <p>All payments are processed via trusted third-party providers such as Razorpay. We do not store your card or banking details on our servers.</p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">4. Data Sharing</h2>
          <p className="mb-2">We do not sell your personal data. We may share data only with:</p>
          <ul className="list-disc ml-6">
            <li>Payment processors</li>
            <li>Legal authorities (if required)</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">5. Cookies</h2>
          <p>We use cookies to enhance user experience and track usage patterns.</p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">6. Data Protection</h2>
          <p>We implement industry-standard security measures to protect your data.</p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">7. User Rights</h2>
          <p className="mb-2">You may request:</p>
          <ul className="list-disc ml-6">
            <li>Access to your data</li>
            <li>Deletion of your account</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">8. Changes to Policy</h2>
          <p>We may update this policy at any time. Continued use means acceptance.</p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
          <p>For any privacy concerns, contact us at: <a href="mailto:support@luckyora.live" className="text-blue-500">support@luckyora.live</a></p>
        </section>
      </div>
    )
  }