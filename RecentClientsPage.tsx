import { useState, useEffect } from 'react';
import { Calendar, MapPin, Star, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { VehicleSubmission, VehicleMedia } from '../types/vehicle';
import Footer from './Footer';

interface ClientShowcase extends VehicleSubmission {
  media: VehicleMedia[];
}

interface RecentClientsPageProps {
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToCookiePolicy?: () => void;
  onNavigateToTerms?: () => void;
}

export default function RecentClientsPage({ onNavigateToPrivacyPolicy, onNavigateToCookiePolicy, onNavigateToTerms }: RecentClientsPageProps) {
  const [clients, setClients] = useState<ClientShowcase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentClients();
  }, []);

  const fetchRecentClients = async () => {
    try {
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('vehicle_submissions')
        .select('*')
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(12);

      if (submissionsError) throw submissionsError;

      const submissionsWithMedia = await Promise.all(
        (submissionsData || []).map(async (submission) => {
          const { data: mediaData } = await supabase
            .from('vehicle_media')
            .select('*')
            .eq('submission_id', submission.id)
            .eq('media_type', 'photo')
            .order('display_order')
            .limit(1);

          return {
            ...submission,
            media: mediaData || [],
          };
        })
      );

      setClients(submissionsWithMedia);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMonthAgo = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const testimonials = [
    {
      name: 'Michael Johnson',
      vehicle: 'BMW 4 Series',
      text: 'Great experience! The process was smooth and they obtained a higher price then expected. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      vehicle: 'Porsche Macan',
      text: 'Very professional team. They quickly got me a great value and put me in touch with the dealership.',
      rating: 5,
    },
    {
      name: 'David Martinez',
      vehicle: 'Porsche 911',
      text: 'Within 24 hours I had a better price offered then any dealer I tried, was easy and effective.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Recent Clients</h1>
          <p className="text-xl text-slate-600">
            See what our recent clients have to say
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="w-8 h-8 text-slate-900 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center relative overflow-hidden">
                  {client.media.length > 0 ? (
                    <img
                      src={client.media[0].file_url}
                      alt={`${client.year} ${client.make} ${client.model}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-slate-600 text-sm">No image available</p>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {client.year} {client.make} {client.model}
                  </h3>
                  {client.trim && (
                    <p className="text-sm text-slate-600 mb-4">{client.trim}</p>
                  )}

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-slate-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{client.mileage.toLocaleString()} miles</span>
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Sold {getMonthAgo(client.updated_at!)}</span>
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <div className="w-4 h-4 mr-2 flex-shrink-0 rounded" style={{ backgroundColor: client.colour_exterior.toLowerCase() }} />
                      <span>{client.colour_exterior}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold capitalize">{client.condition}</span> condition • Sold for competitive price
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-slate-200 pt-4">
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.vehicle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Vehicle?</h2>
          <p className="text-lg text-slate-300 mb-8">
            Join hundreds of satisfied customers who got fair prices for their vehicles.
          </p>
          <button className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-colors">
            Submit Your Vehicle Now
          </button>
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
