import { Upload, Check, Clock, BadgeCheck, FileText } from 'lucide-react';
import Footer from './Footer';

interface HowItWorksPageProps {
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToCookiePolicy?: () => void;
  onNavigateToTerms?: () => void;
}

export default function HowItWorksPage({ onNavigateToPrivacyPolicy, onNavigateToCookiePolicy, onNavigateToTerms }: HowItWorksPageProps) {
  const steps = [
    {
      number: 1,
      title: 'Submit Your Vehicle',
      description: 'Fill out our detailed form with your vehicle information. Include year, make, model, mileage, condition, and any history.',
      icon: Upload,
    },
    {
      number: 2,
      title: 'Upload Photos & Videos',
      description: 'Add multiple photos from different angles and optional videos. Clear images help us provide accurate quotes.',
      icon: FileText,
    },
    {
      number: 3,
      title: 'We Review And Submit',
      description: 'Our expert team carefully evaluates your vehicle details and media. We then submit your vehicle off to all appropriate parties and negotiate the price. This typically takes 24-48 hours.',
      icon: Check,
    },
    {
      number: 4,
      title: 'Receive Your Quote',
      description: 'We will then contact you with the best price we achieved for you to review.',
      icon: BadgeCheck,
    },
    {
      number: 5,
      title: 'Accept the offer',
      description: 'If you accept the offer, we put you into contact with the dealership/ trader.',
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">How It Works</h1>
          <p className="text-xl text-slate-600">
            Our simple 5-step process gets you the best price for your vehicle
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div key={step.number} className="flex items-center gap-8">
                <div
                  className={`flex-1 ${isEven ? 'order-1' : 'order-2'}`}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {step.number}
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900">{step.title}</h2>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>

                <div className={`hidden md:flex flex-col items-center ${isEven ? 'order-2' : 'order-1'}`}>
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                    <Icon className="w-12 h-12 text-slate-900" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-1 h-20 bg-gradient-to-b from-slate-900 to-slate-300 my-4" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">What We're Looking For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Vehicle Information</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Year, make, model, trim</li>
                <li>Current mileage</li>
                <li>VIN (optional but helpful)</li>
                <li>Interior and exterior condition</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">History Details</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Accident history</li>
                <li>Service and maintenance records</li>
                <li>Any modifications made</li>
                <li>Known issues or concerns</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Media</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Multiple exterior photos</li>
                <li>Interior photos</li>
                <li>Close-up detail shots</li>
                <li>Walk-around video (optional)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-md mx-auto">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Timeline</h3>
            <ul className="space-y-2 text-blue-800">
              <li>Submission: Immediate</li>
              <li>Review: 24-48 hours</li>
              <li>Quote: Within 48 hours of submission</li>
            </ul>
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
