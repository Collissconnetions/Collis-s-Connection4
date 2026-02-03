import { Award, Users, TrendingUp, Heart } from 'lucide-react';
import Footer from './Footer';

interface AboutUsPageProps {
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToCookiePolicy?: () => void;
  onNavigateToTerms?: () => void;
}

export default function AboutUsPage({ onNavigateToPrivacyPolicy, onNavigateToCookiePolicy, onNavigateToTerms }: AboutUsPageProps) {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every enquiry and transaction, with a clear commitment to finding the best value for your vehicle.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We listen to your needs and work to exceed your expectations.',
    },
    {
      icon: TrendingUp,
      title: 'Transparency',
      description: 'No hidden fees, no surprises. We explain our pricing process clearly and keep you informed throughout.',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We operate with honesty and integrity in all our dealings. Your trust is our most valuable asset.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">About Us</h1>
          <p className="text-xl text-slate-600">
            Every car has the right price, It's about connecting it with the right person.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl aspect-square flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-slate-900">7+</div>
              <p className="text-slate-700 mt-2 text-lg">Years of Experience</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
            <p className="text-slate-700 mb-4 text-lg leading-relaxed">
              Collis Connections was founded with a simple vision: to make finding the best value for your vehicle easy, transparent, and completely stress-free.
            </p>
            <p className="text-slate-700 mb-4 text-lg leading-relaxed">
              Through many years of experience in the motor trade, we saw first-hand how part exchanges and vehicle valuations often became the biggest obstacle to completing a deal. Too often, dealerships would place inconsistent or low valuations on cars — influenced by their own margins, personal opinions, or by sending the vehicle details to only a small number of buyers who may not even be interested.
            </p>
            <p className="text-slate-700 mb-4 text-lg leading-relaxed">
              What we quickly realised is that different dealerships are looking for different stock at different times. Targets, demand, and stock requirements vary constantly, which naturally leads to significant differences in the prices offered for the same vehicle.
            </p>
            <p className="text-slate-700 mb-4 text-lg leading-relaxed">
              That's where Collis Connections comes in.
            </p>
            <p className="text-slate-700 mb-4 text-lg leading-relaxed">
              We offer and negotiate your vehicle across a wide network of buyers to ensure it's seen by those who genuinely want it. We then secure the strongest possible offer, clearly show you who that buyer is, and connect you directly to confirm the deal with confidence.
            </p>
            <p className="text-slate-700 text-lg leading-relaxed">
              Our mission is simple: to make sure you receive the true value of your car, removing unnecessary complications, stress free and ensuring your vehicle's value never stands in the way of selling your car or moving into your next dream car. We do the work, you relax.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="w-12 h-12 text-slate-900 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer
        onNavigateToPrivacyPolicy={onNavigateToPrivacyPolicy}
        onNavigateToCookiePolicy={onNavigateToCookiePolicy}
        onNavigateToTerms={onNavigateToTerms}
      />
    </div>
  );
}