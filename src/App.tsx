import { useState, useEffect } from 'react';
import VehicleSubmissionForm from './components/VehicleSubmissionForm';
import AdminView from './components/AdminView';
import HomePage from './components/HomePage';
import HowItWorksPage from './components/HowItWorksPage';
import AboutUsPage from './components/AboutUsPage';
import RecentClientsPage from './components/RecentClientsPage';
import ContactUsPage from './components/ContactUsPage';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import CookiePolicyPage from './components/CookiePolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import { Car, LayoutDashboard, Home, Info, Users, MessageSquare } from 'lucide-react';

type View = 'home' | 'form' | 'admin' | 'how-it-works' | 'about' | 'recent-clients' | 'contact' | 'privacy-policy' | 'cookie-policy' | 'terms';

function App() {
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'form', label: 'Submit Vehicle', icon: Car },
    { id: 'how-it-works', label: 'How It Works', icon: Users },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'recent-clients', label: 'Recent Clients', icon: Users },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
    { id: 'admin', label: 'Admin Dashboard', icon: LayoutDashboard },
  ];

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <HomePage
            onNavigateToPrivacyPolicy={() => setView('privacy-policy')}
            onNavigateToCookiePolicy={() => setView('cookie-policy')}
            onNavigateToTerms={() => setView('terms')}
          />
        );
      case 'form':
        return (
          <VehicleSubmissionForm
            onNavigateToPrivacyPolicy={() => setView('privacy-policy')}
            onNavigateToCookiePolicy={() => setView('cookie-policy')}
            onNavigateToTerms={() => setView('terms')}
          />
        );
      case 'admin':
        return <AdminView />;
      case 'how-it-works':
        return (
          <HowItWorksPage
            onNavigateToPrivacyPolicy={() => setView('privacy-policy')}
            onNavigateToCookiePolicy={() => setView('cookie-policy')}
            onNavigateToTerms={() => setView('terms')}
          />
        );
      case 'about':
        return (
          <AboutUsPage
            onNavigateToPrivacyPolicy={() => setView('privacy-policy')}
            onNavigateToCookiePolicy={() => setView('cookie-policy')}
            onNavigateToTerms={() => setView('terms')}
          />
        );
      case 'recent-clients':
        return (
          <RecentClientsPage
            onNavigateToPrivacyPolicy={() => setView('privacy-policy')}
            onNavigateToCookiePolicy={() => setView('cookie-policy')}
            onNavigateToTerms={() => setView('terms')}
          />
        );
      case 'contact':
        return (
          <ContactUsPage
            onNavigateToPrivacyPolicy={() => setView('privacy-policy')}
            onNavigateToCookiePolicy={() => setView('cookie-policy')}
            onNavigateToTerms={() => setView('terms')}
          />
        );
      case 'privacy-policy':
        return (
          <PrivacyPolicyPage
            onBack={() => setView('home')}
            onNavigateToCookiePolicy={() => setView('cookie-policy')}
            onNavigateToTerms={() => setView('terms')}
          />
        );
      case 'cookie-policy':
        return (
          <CookiePolicyPage
            onBack={() => setView('home')}
            onNavigateToPrivacyPolicy={() => setView('privacy-policy')}
            onNavigateToTerms={() => setView('terms')}
          />
        );
      case 'terms':
        return (
          <TermsOfServicePage
            onBack={() => setView('home')}
            onNavigateToPrivacyPolicy={() => setView('privacy-policy')}
            onNavigateToCookiePolicy={() => setView('cookie-policy')}
          />
        );
      default:
        return (
          <HomePage
            onNavigateToPrivacyPolicy={() => setView('privacy-policy')}
            onNavigateToCookiePolicy={() => setView('cookie-policy')}
            onNavigateToTerms={() => setView('terms')}
          />
        );
    }
  };

  return (
    <>
      <CookieConsent
        onOpenPrivacyPolicy={() => setView('privacy-policy')}
        onOpenCookiePolicy={() => setView('cookie-policy')}
      />
      <div className="min-h-screen">
        <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-8">
            <button onClick={() => setView('home')} className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
              <Car className="w-8 h-8 text-slate-900" />
              <span className="text-lg font-bold text-slate-900 hidden sm:inline">Collis's Connections</span>
            </button>

            <div className="hidden md:flex items-center gap-1 flex-1">
              {navItems.slice(0, -1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id as View)}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                    view === item.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex md:hidden gap-1">
              <button
                onClick={() => setView('form')}
                className={`px-2 py-1 rounded-lg font-medium text-sm transition-colors flex items-center gap-1 ${
                  view === 'form'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Car className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('admin')}
                className={`px-2 py-1 rounded-lg font-medium text-sm transition-colors flex items-center gap-1 ${
                  view === 'admin'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setView('admin')}
              className="hidden md:block px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
        </nav>
        {renderView()}
      </div>
    </>
  );
}

export default App;
