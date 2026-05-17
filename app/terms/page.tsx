import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Luckyora',
  description: 'Review our Terms & Conditions for using Luckyora games platform.',
  keywords: 'terms, conditions, user agreement',
  alternates: {
    canonical: 'https://luckyora.live/terms'
  }
};

export default function Terms() {
  return (
    <main className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm">
          <ul className="flex items-center gap-2">
            <li>
              <Link href="/" className="text-blue-400 hover:text-blue-300">
                Home
              </Link>
            </li>
            <span className="text-gray-500">/</span>
            <li className="text-gray-400">Terms & Conditions</li>
          </ul>
        </nav>

        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-gray-400 mb-8">Last updated: May 17, 2026</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-6">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-4">
              By accessing and using Luckyora (the "Service"), you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="text-gray-300 mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Luckyora 
              for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, 
              and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to modify, decompile, disassemble, reverse engineer, or discover source code or secret information</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              The materials on Luckyora are provided on an 'as is' basis. Luckyora makes no warranties, expressed or implied, 
              and hereby disclaims and negates all other warranties including, without limitation, implied warranties or 
              conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property 
              or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Limitations of Liability</h2>
            <p className="text-gray-300 mb-4">
              In no event shall Luckyora or its suppliers be liable for any damages (including, without limitation, damages 
              for loss of data or profit, or due to business interruption) arising out of the use or inability to use the 
              materials on Luckyora.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
            <p className="text-gray-300 mb-4">
              The materials appearing on Luckyora could include technical, typographical, or photographic errors. Luckyora 
              does not warrant that any of the materials on the Service are accurate, complete, or current. Luckyora may make 
              changes to the materials contained on the Service at any time without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Materials on Other Sites</h2>
            <p className="text-gray-300 mb-4">
              Luckyora has not reviewed all of the sites linked to its website and is not responsible for the contents of any 
              such linked site. The inclusion of any link does not imply endorsement by Luckyora of the site. Use of any such 
              linked website is at the user's own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
            <p className="text-gray-300 mb-4">
              Luckyora may revise these terms and conditions for the Service at any time without notice. By using the Service, 
              you are agreeing to be bound by the then current version of these terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. No Real Money Gaming</h2>
            <div className="bg-red-900 border border-red-600 rounded-lg p-4 mb-4">
              <p className="text-red-100 font-bold">
                ⚠️ IMPORTANT: This platform does not offer real-money gaming, gambling, or financial rewards of any kind. 
                All games are strictly for entertainment purposes only.
              </p>
            </div>
            <p className="text-gray-300 mb-4">
              Users acknowledge that:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>No real money can be won or lost through any games on this platform</li>
              <li>No gambling services are offered</li>
              <li>No financial transactions are conducted through games</li>
              <li>All gameplay is for entertainment only</li>
              <li>This platform is not affiliated with any gambling or betting services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. User Responsibilities</h2>
            <p className="text-gray-300 mb-4">
              Users agree to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Use the Service in a lawful manner</li>
              <li>Not engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
              <li>Not transmit obscene, offensive, or disruptive messages</li>
              <li>Not disrupt the normal flow of dialogue within the Service</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
            <p className="text-gray-300 mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of India, and you 
              irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-300 mb-2"><strong>Email:</strong> support@luckyora.live</p>
              <p className="text-gray-300 mb-2"><strong>Phone:</strong> +91 8269372112</p>
              <p className="text-gray-300"><strong>Address:</strong> 01, Jalaram Ashish, Dindayal Cross Rd, Dombivli West, Maharashtra 421202, India</p>
            </div>
          </section>
        </article>

        {/* Navigation Links */}
        <nav className="mt-12 pt-8 border-t border-gray-700 flex flex-wrap gap-4 justify-center text-sm">
          <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>
          <span className="text-gray-500">•</span>
          <Link href="/dmca" className="text-blue-400 hover:text-blue-300">DMCA Policy</Link>
          <span className="text-gray-500">•</span>
          <Link href="/contact" className="text-blue-400 hover:text-blue-300">Contact Us</Link>
        </nav>
      </div>
    </main>
  );
}
