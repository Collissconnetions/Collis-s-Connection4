import React from 'react';
import { ArrowLeft, Cookie } from 'lucide-react';
import Footer from './Footer';

interface CookiePolicyPageProps {
  onBack: () => void;
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToTerms?: () => void;
}

export default function CookiePolicyPage({ onBack, onNavigateToPrivacyPolicy, onNavigateToTerms }: CookiePolicyPageProps) {
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
            <Cookie className="text-amber-400 mr-3" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Cookie Policy</h1>
          </div>

          <p className="text-slate-300 mb-6">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies?</h2>
              <p className="mb-4">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when
                you visit a website. They help the website remember your actions and preferences over a period of time,
                so you don't have to keep re-entering information whenever you come back to the site or browse from
                one page to another.
              </p>
              <p>
                Cookies are widely used to make websites work more efficiently and provide valuable information to
                website owners about how visitors interact with their sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
              <p className="mb-4">
                Collis's Connections uses cookies to enhance your browsing experience, understand how our website is used,
                and improve our services. We only use non-essential cookies with your explicit consent, in accordance
                with UK GDPR and the Privacy and Electronic Communications Regulations (PECR).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Types of Cookies We Use</h2>

              <div className="space-y-6 mt-4">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Essential Cookies (Strictly Necessary)</h3>
                  <p className="mb-3">
                    These cookies are essential for the website to function properly. They enable core functionality
                    such as security, network management, and accessibility. You cannot opt-out of these cookies.
                  </p>
                  <div className="bg-slate-800/50 rounded p-4 mt-4">
                    <p className="font-semibold text-white mb-2">Cookies in this category:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li><strong>cookie_consent</strong> - Stores your cookie preferences (12 months)</li>
                      <li><strong>session_security</strong> - Security and authentication tokens (Session)</li>
                    </ul>
                  </div>
                  <p className="mt-3 text-sm">
                    <strong>Legal basis:</strong> These cookies are necessary for the legitimate operation of our
                    website and do not require consent under PECR.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Functional Cookies</h3>
                  <p className="mb-3">
                    These cookies enable enhanced functionality and personalization, such as remembering your
                    preferences and settings. If you do not allow these cookies, some or all of these services
                    may not function properly.
                  </p>
                  <div className="bg-slate-800/50 rounded p-4 mt-4">
                    <p className="font-semibold text-white mb-2">Cookies in this category:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li><strong>user_preferences</strong> - Stores your site preferences (12 months)</li>
                      <li><strong>language_preference</strong> - Remembers your language choice (12 months)</li>
                    </ul>
                  </div>
                  <p className="mt-3 text-sm">
                    <strong>Legal basis:</strong> These cookies require your consent before being set.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Analytics Cookies</h3>
                  <p className="mb-3">
                    These cookies help us understand how visitors interact with our website by collecting and
                    reporting information anonymously. This helps us improve the website's performance and your
                    browsing experience.
                  </p>
                  <div className="bg-slate-800/50 rounded p-4 mt-4">
                    <p className="font-semibold text-white mb-2">Cookies in this category:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li><strong>_analytics_id</strong> - Anonymous visitor tracking (12 months)</li>
                      <li><strong>_page_views</strong> - Page visit statistics (12 months)</li>
                    </ul>
                  </div>
                  <p className="mt-3 text-sm">
                    <strong>Legal basis:</strong> These cookies require your consent before being set.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Cookies</h2>
              <p className="mb-3">
                In some cases, we use cookies provided by trusted third parties to enhance your experience:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Supabase:</strong> Our database and backend service provider may set essential cookies for
                  authentication and session management
                </li>
                <li>
                  <strong>Analytics Services:</strong> If enabled with your consent, we may use analytics services to
                  better understand our website usage
                </li>
              </ul>
              <p className="mt-4">
                All third-party service providers are carefully selected and comply with UK GDPR requirements. We ensure
                they only process your data as per our instructions and maintain appropriate security measures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Managing Your Cookie Preferences</h2>
              <p className="mb-4">
                You have full control over which cookies you accept on our website:
              </p>

              <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Cookie Settings on Our Website</h3>
                <p className="mb-3">
                  You can change your cookie preferences at any time by clicking the "Cookie Settings" button in the
                  footer of our website. This will allow you to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Enable or disable specific cookie categories</li>
                  <li>View detailed information about each cookie type</li>
                  <li>Withdraw your consent for non-essential cookies</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-400/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Browser Settings</h3>
                <p className="mb-3">
                  Most web browsers allow you to control cookies through their settings. You can typically:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>View what cookies are stored and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies from being set</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>
                <p className="mt-3 text-sm">
                  Please note: If you block all cookies, some parts of our website may not function properly.
                </p>
              </div>

              <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-sm font-semibold text-white mb-2">Browser-specific cookie settings:</p>
                <ul className="space-y-1 text-sm ml-4">
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                  <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Impact of Disabling Cookies</h2>
              <p className="mb-3">
                Disabling certain cookies may impact your experience on our website:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Essential cookies:</strong> Cannot be disabled. The website will not function without them.
                </li>
                <li>
                  <strong>Functional cookies:</strong> You may need to re-enter preferences each time you visit.
                </li>
                <li>
                  <strong>Analytics cookies:</strong> We won't be able to monitor website performance, but the site will
                  function normally.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Updates to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our cookie usage or legal
                requirements. Any changes will be posted on this page with an updated "Last updated" date. If we make
                significant changes, we may request your renewed consent through our cookie banner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. More Information</h2>
              <p className="mb-4">
                For more information about how we process your personal data, please see our Privacy Policy. If you
                have questions about our use of cookies, please contact us at:
              </p>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="font-semibold text-white">Email:</p>
                <a href="mailto:info@collissconnections.co.uk" className="text-blue-400 hover:text-blue-300">
                  info@collissconnections.co.uk
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Useful Resources</h2>
              <p className="mb-3">For more information about cookies and how to manage them, visit:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <a href="https://ico.org.uk/for-the-public/online/cookies/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    ICO - Cookies
                  </a>
                </li>
                <li>
                  <a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    AboutCookies.org
                  </a>
                </li>
                <li>
                  <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    AllAboutCookies.org
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer
        onNavigateToPrivacyPolicy={onNavigateToPrivacyPolicy}
        onNavigateToCookiePolicy={onBack}
        onNavigateToTerms={onNavigateToTerms}
      />
    </div>
  );
}
