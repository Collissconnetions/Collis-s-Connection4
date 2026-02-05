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
import { AuthProvider } from './lib/auth';
import { Car, Home, Info, Users, MessageSquare } from 'lucide-react';

type View = 'home' | 'form' | 'admin' | 'how-it-works' | 'about' | 'recent-clients' | 'contact' | 'privacy-policy' | 'cookie-policy' | 'terms';

function App() {
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setView('admin');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'form', label: 'Submit Vehicle', icon: Car },
    { id: 'how-it-works', label: 'How It Works', icon: Users },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'recent-clients', label: 'Recent Clients', icon: Users },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
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
    <AuthProvider>
      <CookieConsent
        onOpenPrivacyPolicy={() => setView('privacy-policy')}
        onOpenCookiePolicy={() => setView('cookie-policy')}
      />
      <div className="min-h-screen">
        <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-8">
            <button onClick={() => setView('home')} className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
              <img src="/img_4272.jpeg" alt="Collis's Connections" className="h-12 w-auto object-contain mt-1" />
              <span className="text-2xl font-bold text-slate-900 hidden sm:inline leading-none">Collis's Connections</span>
            </button>

            <div className="flex items-center gap-1 flex-1 justify-end">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id as View)}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors hidden md:block ${
                    view === item.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setView('form')}
                className={`md:hidden px-2 py-1 rounded-lg font-medium text-sm transition-colors flex items-center gap-1 ${
                  view === 'form'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Car className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        </nav>
        {renderView()}
      </div>
    </AuthProvider>
  );
}

export default App;
