import { useState } from 'react';
import { Mail, Clock, Send, Phone } from 'lucide-react';
import Footer from './Footer';

interface ContactUsPageProps {
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToCookiePolicy?: () => void;
  onNavigateToTerms?: () => void;
}

export default function ContactUsPage({ onNavigateToPrivacyPolicy, onNavigateToCookiePolicy, onNavigateToTerms }: ContactUsPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '07341 811630',
      link: 'tel:07341811630',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@collisconnections.co.uk',
      link: 'mailto:info@collisconnections.co.uk',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri 9am-6pm, Sat 9am-12pm',
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-xl text-slate-600">
            Have questions? We'd love to hear from you. Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Get in Touch</h2>
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                const content = (
                  <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <Icon className="w-6 h-6 text-slate-900 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{info.title}</h3>
                      <p className="text-slate-600">{info.details}</p>
                    </div>
                  </div>
                );

                return info.link ? (
                  <a key={info.title} href={info.link} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={info.title}>{content}</div>
                );
              })}
            </div>

            <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-3">Quick Response Times</h3>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li>Email Enquiries: Responded within 24 hours</li>
                <li>Vehicle submissions: Responded with price within 48 hours</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">
                    Thank you! We've received your message and will get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Enquiry</option>
                    <option value="submission">Question about Submission</option>
                    <option value="quote">Question about Quote</option>
                    <option value="pickup">Having Trouble</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">FAQ</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 mb-2">How long does it take to get a value?</h4>
                <p className="text-slate-600">
                  We aim to come back to you within 48 hours with the best price.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">How long do I have to accept the offer?</h4>
                <p className="text-slate-600">
                 It depends on how long the buyer stands for but typically we  say 7 days.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Do you accept all vehicles?</h4>
                <p className="text-slate-600">
                  We accept vehicles of all makes, models, and conditions. Submit yours today to find out.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Connect With Us</h3>
            <p className="text-slate-600 mb-6">
              Follow us on social media for updates, tips, and current desired vehicles.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full text-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
              >
                f
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full text-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
              >
                𝕏
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full text-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
              >
                in
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full text-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
              >
                📷
              </a>
            </div>
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
