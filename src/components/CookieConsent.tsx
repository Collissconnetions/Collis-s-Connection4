import { useState, useEffect } from 'react';
import { Cookie, X, Settings, Shield, BarChart, Wrench } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
}

interface CookieConsentProps {
  onOpenPrivacyPolicy?: () => void;
  onOpenCookiePolicy?: () => void;
}

export default function CookieConsent({ onOpenPrivacyPolicy, onOpenCookiePolicy }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        setShowBanner(true);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
    };
    setPreferences(essentialOnly);
    savePreferences(essentialOnly);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return;
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-2xl animate-slide-up">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200">
          {!showSettings ? (
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Cookie className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-slate-900 mb-2">
                    We Value Your Privacy
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We use cookies to enhance your browsing experience, remember your preferences, and analyze our
                    website traffic. By clicking "Accept All", you consent to our use of cookies in accordance with UK
                    GDPR regulations.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {onOpenPrivacyPolicy && (
                      <button
                        onClick={onOpenPrivacyPolicy}
                        className="text-xs text-blue-600 hover:text-blue-700 underline"
                      >
                        Privacy Policy
                      </button>
                    )}
                    {onOpenCookiePolicy && (
                      <button
                        onClick={onOpenCookiePolicy}
                        className="text-xs text-blue-600 hover:text-blue-700 underline"
                      >
                        Cookie Policy
                      </button>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleRejectAll}
                  className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Reject all cookies"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex-1 bg-white text-slate-700 px-4 py-2.5 rounded-lg text-sm font-semibold border-2 border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Cookie Settings
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-6 h-6 text-slate-700" />
                  <h2 className="text-lg font-bold text-slate-900">Manage Cookie Preferences</h2>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Close settings"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 text-sm mb-1">Essential Cookies</h3>
                        <p className="text-xs text-slate-600">
                          Required for the website to function. These cannot be disabled as they are necessary for
                          security, network management, and accessibility.
                        </p>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Always Active
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Wrench className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 text-sm mb-1">Functional Cookies</h3>
                        <p className="text-xs text-slate-600">
                          Enable enhanced functionality and personalization, such as remembering your preferences and
                          settings.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => togglePreference('functional')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <BarChart className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 text-sm mb-1">Analytics Cookies</h3>
                        <p className="text-xs text-slate-600">
                          Help us understand how visitors interact with our website by collecting and reporting
                          information anonymously.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => togglePreference('analytics')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-white text-slate-700 px-4 py-2.5 rounded-lg text-sm font-semibold border-2 border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function openCookieSettings() {
  localStorage.removeItem('cookieConsent');
  window.location.reload();
}
