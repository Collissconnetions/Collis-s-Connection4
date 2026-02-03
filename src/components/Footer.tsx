import { Cookie } from 'lucide-react';
import { openCookieSettings } from './CookieConsent';

interface FooterProps {
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToCookiePolicy?: () => void;
  onNavigateToTerms?: () => void;
}

export default function Footer({ onNavigateToPrivacyPolicy, onNavigateToCookiePolicy, onNavigateToTerms }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Collis's Connections</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted partner in getting the best value for your vehicle. We connect you with serious buyers
              and handle the negotiation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {onNavigateToPrivacyPolicy && (
                <li>
                  <button
                    onClick={onNavigateToPrivacyPolicy}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Privacy Policy
                  </button>
                </li>
              )}
              {onNavigateToCookiePolicy && (
                <li>
                  <button
                    onClick={onNavigateToCookiePolicy}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Cookie Policy
                  </button>
                  </li>
              )}
              {onNavigateToTerms && (
                <li>
                  <button
                    onClick={onNavigateToTerms}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Terms of Service
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Cookie Preferences</h3>
            <button
              onClick={openCookieSettings}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-2"
            >
              <Cookie className="w-4 h-4" />
              Manage Cookies
            </button>
            <p className="text-slate-400 text-xs mt-3">
              You can change your cookie preferences at any time.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Collis's Connections. All rights reserved.
          </p>
          <p className="text-slate-400 text-xs text-center md:text-right">
            Compliant with UK GDPR and Data Protection Act 2018
          </p>
        </div>
      </div>
    </footer>
  );
}
