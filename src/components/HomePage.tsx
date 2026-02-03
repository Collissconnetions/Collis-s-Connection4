import { ArrowRight, Zap, Users, TrendingUp, Shield, ListChecks, Clock, CheckCircle, Star, Camera, FileText, Gauge, AlertCircle } from 'lucide-react';
import Footer from './Footer';

interface HomePageProps {
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToCookiePolicy?: () => void;
  onNavigateToTerms?: () => void;
}

export default function HomePage({ onNavigateToPrivacyPolicy, onNavigateToCookiePolicy, onNavigateToTerms }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Get the Best Price for Your Vehicle
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Submit your vehicle information with photos and videos. Our experts will review your submission and find you the best possible price for your vehicle.
            </p>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
              Submit Your Vehicle <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Get The Best Value In The Simplest Way</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800 p-8 rounded-xl hover:bg-slate-700 transition-colors">
              <ListChecks className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">Simple Steps</h3>
              <p className="text-slate-300">Start by submitting photos and key details of your vehicle.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl hover:bg-slate-700 transition-colors">
              <Clock className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">Sit Back and Relax</h3>
              <p className="text-slate-300">We submit this to all potential buyers and do the negotiation for you.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl hover:bg-slate-700 transition-colors">
              <CheckCircle className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">No Hassle</h3>
              <p className="text-slate-300">We achieve the best possible price for you and connect you only with serious, qualified buyers.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl hover:bg-slate-700 transition-colors">
              <Star className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">Zero Risk</h3>
              <p className="text-slate-300">Aslong as you're happy with the price, it's a £199.99 fee. You only proceed if you're completely satisfied with the offer.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <Zap className="w-12 h-12 text-slate-900 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Fast Process</h3>
              <p className="text-slate-600">Submit your vehicle information using our quick and easy process. Our Specalists will come back to you within 48 hours.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <TrendingUp className="w-12 h-12 text-slate-900 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Best Value</h3>
              <p className="text-slate-600">We guarantee to find you a better value then you already have without paying a fee.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-slate-900 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Team</h3>
              <p className="text-slate-600">Our specialists do the negotiation for you, with years and years of experience. Sit back and let us do the work for you.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <Shield className="w-12 h-12 text-slate-900 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Transparent</h3>
              <p className="text-slate-600">No hidden fees or surprises. No obligation to sell, we find the best value and put you in contact with the buyer and we don't give the buyer your information so you can decide and not feel under pressure.
.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">What We Require From You?</h2>
          <p className="text-center text-slate-300 mb-16 max-w-3xl mx-auto">
            To get you the best possible price, we need a few key pieces of information about your vehicle
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800 p-8 rounded-xl hover:bg-slate-700 transition-colors">
              <Camera className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">Clear Photos</h3>
              <p className="text-slate-300">High-quality images of your vehicle from multiple angles, including interior and exterior shots.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl hover:bg-slate-700 transition-colors">
              <Gauge className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">Registration and Mileage</h3>
              <p className="text-slate-300">Your vehicle's registration number and current mileage for accurate valuation and verification.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl hover:bg-slate-700 transition-colors">
              <FileText className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">Vehicle Details</h3>
              <p className="text-slate-300">Make, model, year, service history and any modifications or damage information.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl hover:bg-slate-700 transition-colors">
              <AlertCircle className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-bold mb-2">Honesty over Condition</h3>
              <p className="text-slate-300">Such as any marks, dents, damage, last time tires where changed (if necessary). This is key as this will determine a value on a car. If you lie, the buyer may change the price. We do not offer a refund if this is the case.</p>
            </div>
          </div>
          <div className="mt-12 bg-white border-2 border-slate-700 rounded-lg p-6 max-w-5xl mx-auto">
            <p className="text-slate-900 text-center font-semibold text-lg">
              <AlertCircle className="w-5 h-5 inline-block mr-2 -mt-1" />
              The information provided above is essential, as it is used to determine the accurate value of your vehicle. If any of the details are misrepresented or incorrect, the buyer reserves the right to adjust the offered price accordingly. Please note that no refunds will be issued under these circumstances.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Sell Your Vehicle?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Submit your vehicle information now and our experts will onbtain the best price for you.
            </p>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <Footer
        onNavigateToPrivacyPolicy={onNavigateToPrivacyPolicy}
        onNavigateToCookiePolicy={onNavigateToCookiePolicy}
        onNavigateToTerms={onNavigateToTerms}
      />
    </div>
  );
}
