import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import Footer from './Footer';

interface TermsOfServicePageProps {
  onBack: () => void;
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToCookiePolicy?: () => void;
}

export default function TermsOfServicePage({ onBack, onNavigateToPrivacyPolicy, onNavigateToCookiePolicy }: TermsOfServicePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={onBack}
          className="flex items-center text-slate-300 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
          Back to Home
        </button>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
          <div className="flex items-center mb-6">
            <FileText className="text-green-400 mr-3" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
          </div>

          <p className="text-slate-300 mb-6">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                By accessing and using the Collis's Connections website and services ("Services"), you agree to be bound
                by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you ("User", "you", or "your") and Collis's
                Connections ("we", "us", or "our"), a vehicle brokerage service operating in the United Kingdom.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p className="mb-3">
                Collis's Connections provides a platform and service for connecting vehicle sellers with potential buyers.
                Our Services include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Vehicle valuation and assessment</li>
                <li>Marketing vehicles to our network of pre-screened buyers</li>
                <li>Facilitating vehicle sales transactions</li>
                <li>Providing guidance throughout the selling process</li>
              </ul>
              <p className="mt-4">
                We act as an intermediary broker and do not purchase vehicles directly. Our role is to connect sellers
                with genuine buyers and facilitate the transaction process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Eligibility</h2>
              <p className="mb-3">To use our Services, you must:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Be the legal owner of any vehicle you submit for sale, or have the authority to sell on behalf of the owner</li>
                <li>Provide accurate, complete, and truthful information</li>
                <li>Comply with all applicable UK laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Vehicle Submissions</h2>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">4.1 Accuracy of Information</h3>
              <p className="mb-3">
                When submitting your vehicle details, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information about your vehicle</li>
                <li>Disclose all known defects, damage, or mechanical issues</li>
                <li>Provide genuine service history and documentation</li>
                <li>Supply clear and accurate photographs of the vehicle</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">4.2 Verification Rights</h3>
              <p>
                We reserve the right to verify all information provided, including conducting vehicle inspections,
                DVLA checks, and history reports. We may reject or remove any listing that contains inaccurate,
                misleading, or fraudulent information.
              </p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">4.3 No Guarantee of Sale</h3>
              <p>
                Submitting your vehicle does not guarantee a sale. We will use reasonable efforts to market your vehicle
                to our network of buyers, but we cannot guarantee that a buyer will be found or that any particular
                price will be achieved.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Fees and Payment</h2>
              <p className="mb-3">
                Our fee structure will be clearly communicated to you before you agree to proceed with a sale:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Submission of vehicle details is free of charge</li>
                <li>A commission fee is only payable upon successful completion of a sale</li>
                <li>The commission amount and payment terms will be agreed in writing before proceeding</li>
                <li>All fees are inclusive of VAT where applicable</li>
              </ul>
              <p className="mt-4">
                Payment terms and methods will be specified in our separate written agreement upon acceptance of an offer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. User Responsibilities</h2>
              <p className="mb-3">You agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintain the security and confidentiality of any account credentials</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Keep your vehicle available for viewing and inspection as agreed</li>
                <li>Maintain your vehicle in the condition described during the marketing period</li>
                <li>Respond promptly to reasonable requests for information or documentation</li>
                <li>Not use our Services for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Intellectual Property</h2>
              <p className="mb-4">
                All content on the Collis's Connections website, including text, graphics, logos, images, software, and
                design, is the property of Collis's Connections or its licensors and is protected by UK and international
                copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative works of any content from our website
                without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Prohibited Activities</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Attempt to sell stolen vehicles or vehicles with outstanding finance</li>
                <li>Use our Services to commit fraud or other illegal activities</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Attempt to gain unauthorized access to any part of the Services</li>
                <li>Use automated systems (bots, scrapers) to access the Services</li>
                <li>Harass, abuse, or harm other users or our staff</li>
                <li>Collect or harvest personal information of other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
              <p className="mb-4">
                To the fullest extent permitted by UK law:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  We provide our Services "as is" and make no warranties, express or implied, regarding the Services
                </li>
                <li>
                  We are not liable for any indirect, incidental, consequential, or punitive damages arising from your
                  use of the Services
                </li>
                <li>
                  Our total liability to you for any claims arising from these Terms or the Services shall not exceed
                  the fees paid by you to us in the 12 months preceding the claim
                </li>
                <li>
                  We are not responsible for the actions or omissions of buyers or third parties
                </li>
              </ul>
              <p className="mt-4">
                Nothing in these Terms excludes or limits our liability for death or personal injury caused by our
                negligence, fraud, or any other liability that cannot be excluded by UK law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Collis's Connections and its officers, directors,
                employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including
                reasonable legal fees) arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>False or misleading information you provide</li>
                <li>Your use or misuse of the Services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Data Protection and Privacy</h2>
              <p className="mb-3">
                We are committed to protecting your privacy and personal data in accordance with UK GDPR and the Data
                Protection Act 2018. Our collection, use, and protection of your personal information is governed by
                our Privacy Policy, which forms part of these Terms.
              </p>
              <p>
                By using our Services, you consent to our collection and use of your personal data as described in our
                Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Termination</h2>
              <p className="mb-3">
                We reserve the right to suspend or terminate your access to our Services at any time, with or without
                notice, for any reason, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violation of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Providing false or misleading information</li>
                <li>Extended period of inactivity</li>
              </ul>
              <p className="mt-4">
                Upon termination, all rights granted to you under these Terms will immediately cease. Sections that by
                their nature should survive termination shall survive, including liability limitations and dispute
                resolution provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon
                posting to our website. Your continued use of the Services after changes are posted constitutes your
                acceptance of the modified Terms. We will make reasonable efforts to notify you of material changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">14. Governing Law and Jurisdiction</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of England and Wales,
                without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these Terms or the Services shall be subject to the exclusive jurisdiction
                of the courts of England and Wales. However, we retain the right to bring proceedings in the courts
                of the country where you reside.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">15. Dispute Resolution</h2>
              <p className="mb-3">
                In the event of any dispute arising from these Terms or the Services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We encourage you to first contact us to resolve the matter informally</li>
                <li>If informal resolution is unsuccessful, you may pursue mediation before initiating legal proceedings</li>
                <li>You retain all rights to pursue claims in small claims court if eligible</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">16. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid by a court of competent
                jurisdiction, such provision shall be limited or eliminated to the minimum extent necessary, and the
                remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">17. Entire Agreement</h2>
              <p>
                These Terms, together with our Privacy Policy and any other written agreements between you and Collis's
                Connections, constitute the entire agreement between you and us regarding the Services and supersede
                all prior agreements and understandings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">18. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="font-semibold text-white mb-2">Collis's Connections</p>
                <p className="mb-1">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@collissconnections.co.uk" className="text-blue-400 hover:text-blue-300">
                    info@collissconnections.co.uk
                  </a>
                </p>
              </div>
            </section>

            <section className="mt-8 pt-8 border-t border-white/10">
              <p className="text-sm text-slate-400">
                By using Collis's Connections' Services, you acknowledge that you have read, understood, and agree to be
                bound by these Terms of Service.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer
        onNavigateToPrivacyPolicy={onNavigateToPrivacyPolicy}
        onNavigateToCookiePolicy={onNavigateToCookiePolicy}
        onNavigateToTerms={onBack}
      />
    </div>
  );
}
