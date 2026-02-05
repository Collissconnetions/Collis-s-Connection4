import { useState, useEffect } from 'react';
import { Car, Mail, Phone, Calendar, FileText, Image, Video, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import type { VehicleSubmission, VehicleMedia } from '../types/vehicle';
import AdminLogin from './AdminLogin';

interface SubmissionWithMedia extends VehicleSubmission {
  media: VehicleMedia[];
}

export default function AdminView() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [submissions, setSubmissions] = useState<SubmissionWithMedia[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionWithMedia | null>(null);
  const [loading, setLoading] = useState(true);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('vehicle_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (submissionsError) throw submissionsError;

      const submissionsWithMedia = await Promise.all(
        (submissionsData || []).map(async (submission) => {
          const { data: mediaData } = await supabase
            .from('vehicle_media')
            .select('*')
            .eq('submission_id', submission.id)
            .order('display_order');

          return {
            ...submission,
            media: mediaData || [],
          };
        })
      );

      setSubmissions(submissionsWithMedia);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const updateStatus = async (id: string, status: VehicleSubmission['status']) => {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-submission-status`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionId: id,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      fetchSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'quoted':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Vehicle Submissions</h1>
            <p className="text-slate-600">Manage and review all vehicle submissions</p>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            {submissions.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <Car className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No submissions yet</p>
              </div>
            ) : (
              submissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`bg-white rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg ${
                    selectedSubmission?.id === submission.id
                      ? 'ring-2 ring-slate-900 shadow-lg'
                      : 'shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">
                        {submission.year} {submission.make} {submission.model}
                      </h3>
                      <p className="text-sm text-slate-600">{submission.owner_name}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        submission.status || 'pending'
                      )}`}
                    >
                      {submission.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(submission.created_at!)}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {submission.media.filter((m) => m.media_type === 'photo').length > 0 && (
                      <span className="flex items-center text-xs text-slate-600">
                        <Image className="w-3 h-3 mr-1" />
                        {submission.media.filter((m) => m.media_type === 'photo').length}
                      </span>
                    )}
                    {submission.media.filter((m) => m.media_type === 'video').length > 0 && (
                      <span className="flex items-center text-xs text-slate-600">
                        <Video className="w-3 h-3 mr-1" />
                        {submission.media.filter((m) => m.media_type === 'video').length}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-2">
            {selectedSubmission ? (
              <div className="bg-white rounded-xl shadow-xl p-6">
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        {selectedSubmission.year} {selectedSubmission.make}{' '}
                        {selectedSubmission.model}
                      </h2>
                      {selectedSubmission.trim && (
                        <p className="text-slate-600">{selectedSubmission.trim}</p>
                      )}
                    </div>
                    <select
                      value={selectedSubmission.status}
                      onChange={(e) =>
                        updateStatus(
                          selectedSubmission.id!,
                          e.target.value as VehicleSubmission['status']
                        )
                      }
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(
                        selectedSubmission.status || 'pending'
                      )} border-0 cursor-pointer`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="quoted">Quoted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center text-slate-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <a
                        href={`mailto:${selectedSubmission.owner_email}`}
                        className="hover:text-slate-900"
                      >
                        {selectedSubmission.owner_email}
                      </a>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <a
                        href={`tel:${selectedSubmission.owner_phone}`}
                        className="hover:text-slate-900"
                      >
                        {selectedSubmission.owner_phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Vehicle Details
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Mileage</p>
                      <p className="font-medium text-slate-900">
                        {selectedSubmission.mileage.toLocaleString()} miles
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Condition</p>
                      <p className="font-medium text-slate-900 capitalize">
                        {selectedSubmission.condition}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Exterior Colour</p>
                      <p className="font-medium text-slate-900">
                        {selectedSubmission.colour_exterior}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Interior Colour</p>
                      <p className="font-medium text-slate-900">
                        {selectedSubmission.colour_interior}
                      </p>
                    </div>
                    {selectedSubmission.vin && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-slate-500">VIN</p>
                        <p className="font-medium text-slate-900">{selectedSubmission.vin}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-slate-500">Accident History</p>
                      <p className="font-medium text-slate-900">
                        {selectedSubmission.accident_history ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedSubmission.service_history && (
                  <div className="mb-6">
                    <h4 className="font-medium text-slate-900 mb-2">Service History</h4>
                    <p className="text-slate-700 whitespace-pre-wrap">
                      {selectedSubmission.service_history}
                    </p>
                  </div>
                )}

                {selectedSubmission.modifications && (
                  <div className="mb-6">
                    <h4 className="font-medium text-slate-900 mb-2">Modifications</h4>
                    <p className="text-slate-700 whitespace-pre-wrap">
                      {selectedSubmission.modifications}
                    </p>
                  </div>
                )}

                {selectedSubmission.issues && (
                  <div className="mb-6">
                    <h4 className="font-medium text-slate-900 mb-2">Known Issues</h4>
                    <p className="text-slate-700 whitespace-pre-wrap">
                      {selectedSubmission.issues}
                    </p>
                  </div>
                )}

                {selectedSubmission.additional_notes && (
                  <div className="mb-6">
                    <h4 className="font-medium text-slate-900 mb-2">Additional Notes</h4>
                    <p className="text-slate-700 whitespace-pre-wrap">
                      {selectedSubmission.additional_notes}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Photos & Videos</h3>
                  {selectedSubmission.media.filter((m) => m.media_type === 'photo').length >
                    0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Photos</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedSubmission.media
                          .filter((m) => m.media_type === 'photo')
                          .map((media) => (
                            <a
                              key={media.id}
                              href={media.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative aspect-video rounded-lg overflow-hidden"
                            >
                              <img
                                src={media.file_url}
                                alt={media.file_name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </a>
                          ))}
                      </div>
                    </div>
                  )}
                  {selectedSubmission.media.filter((m) => m.media_type === 'video').length >
                    0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Videos</h4>
                      <div className="space-y-2">
                        {selectedSubmission.media
                          .filter((m) => m.media_type === 'video')
                          .map((media) => (
                            <video
                              key={media.id}
                              src={media.file_url}
                              controls
                              className="w-full rounded-lg"
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-xl p-12 text-center">
                <Car className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">
                  Select a submission to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
