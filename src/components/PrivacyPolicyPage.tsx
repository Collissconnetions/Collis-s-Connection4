import React from 'react';
import { ArrowLeft, Shield, Mail } from 'lucide-react';
import Footer from './Footer';

interface PrivacyPolicyPageProps {
  onBack: () => void;
  onNavigateToCookiePolicy?: () => void;
  onNavigateToTerms?: () => void;
}

export default function PrivacyPolicyPage({ onBack, onNavigateToCookiePolicy, onNavigateToTerms }: PrivacyPolicyPageProps) {
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
            <Shield className="text-blue-400 mr-3" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
          </div>

          <p className="text-slate-300 mb-6">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="mb-4">
                Collis's Connections ("we", "our", or "us") is committed to protecting your privacy and personal data.
                This Privacy Policy explains how we collect, use, store, and protect your information in accordance with
                the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
              <p>
                We are the data controller responsible for your personal data. If you have any questions about this
                Privacy Policy or our data practices, please contact us using the details at the end of this document.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <p className="mb-3">We collect the following types of personal data:</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Contact Information:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Telephone number</li>
                <li>Postcode</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Vehicle Information:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Vehicle registration number</li>
                <li>Make, model, and year</li>
                <li>Mileage</li>
                <li>Vehicle condition and service history</li>
                <li>Vehicle photographs (if provided)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Technical Information:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Cookie data (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-3">We process your personal data for the following purposes:</p>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Providing Our Services:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To evaluate your vehicle and provide quotations</li>
                <li>To communicate with you regarding your vehicle submission</li>
                <li>To facilitate the sale of your vehicle</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Legal Basis:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Contract Performance:</strong> Processing necessary to perform our services</li>
                <li><strong>Legitimate Interests:</strong> To improve our services and prevent fraud</li>
                <li><strong>Consent:</strong> For marketing communications and non-essential cookies</li>
                <li><strong>Legal Obligation:</strong> To comply with financial and legal requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Retention</h2>
              <p className="mb-3">We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Active enquiries:</strong> Duration of the transaction plus 6 years (for legal and accounting purposes)</li>
                <li><strong>Unsuccessful enquiries:</strong> 2 years, then securely deleted</li>
                <li><strong>Marketing consent:</strong> Until you withdraw consent</li>
                <li><strong>Cookie data:</strong> As specified in our Cookie Policy (typically 12 months)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing and Disclosure</h2>
              <p className="mb-3">We may share your personal data with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Potential Buyers:</strong> Pre-screened legitimate vehicle buyers (vehicle details only, not personal contact information)</li>
                <li><strong>Service Providers:</strong> Email services, database hosting (Supabase), and communication platforms</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our legal rights</li>
              </ul>
              <p className="mt-3">
                We do not sell your personal data to third parties. All third-party service providers are required to
                maintain the security and confidentiality of your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights Under UK GDPR</h2>
              <p className="mb-3">You have the following rights regarding your personal data:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
                <li><strong>Right to Restriction:</strong> Limit how we process your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for marketing or cookies at any time</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us using the details below. We will respond within
                one month of your request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking</h2>
              <p className="mb-3">
                We use cookies to improve your experience on our website. Cookies are small text files stored on your
                device. We use the following types of cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function (no consent needed)</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings (requires consent)</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (requires consent)</li>
              </ul>
              <p className="mt-4">
                You can manage your cookie preferences at any time using the cookie settings available in the footer
                of our website. For more detailed information, please see our Cookie Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against
                unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Restricted access to personal data (need-to-know basis)</li>
                <li>Secure cloud infrastructure (Supabase with UK/EU data centers)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. International Data Transfers</h2>
              <p>
                Your personal data is primarily stored and processed within the UK and European Economic Area (EEA).
                If we transfer data outside the UK/EEA, we ensure appropriate safeguards are in place, such as:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Standard Contractual Clauses approved by the UK ICO</li>
                <li>Adequacy decisions by the UK government</li>
                <li>Binding corporate rules</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect
                personal data from children. If you believe we have inadvertently collected data from a child,
                please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                requirements. We will notify you of significant changes by posting a notice on our website or sending
                you an email. The "Last updated" date at the top of this policy indicates when it was last revised.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                  please contact us:
                </p>
                <div className="flex items-start space-x-3 mb-3">
                  <Mail className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-white">Email:</p>
                    <a href="mailto:info@collissconnections.co.uk" className="text-blue-400 hover:text-blue-300">
                      info@collissconnections.co.uk
                    </a>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mt-4">
                  <strong>Data Protection Officer:</strong> You can also contact our Data Protection Officer at the
                  email address above for any data protection queries.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Complaints</h2>
              <p className="mb-3">
                If you are not satisfied with how we handle your personal data, you have the right to lodge a
                complaint with the UK Information Commissioner's Office (ICO):
              </p>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p><strong className="text-white">Information Commissioner's Office (ICO)</strong></p>
                <p>Wycliffe House, Water Lane</p>
                <p>Wilmslow, Cheshire, SK9 5AF</p>
                <p className="mt-2">Telephone: 0303 123 1113</p>
                <p>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">www.ico.org.uk</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer
        onNavigateToPrivacyPolicy={onBack}
        onNavigateToCookiePolicy={onNavigateToCookiePolicy}
        onNavigateToTerms={onNavigateToTerms}
      />
    </div>
  );
}
