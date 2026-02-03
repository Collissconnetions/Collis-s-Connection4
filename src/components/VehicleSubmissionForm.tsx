import { useState } from 'react';
import { Upload, Car, User, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { VehicleSubmission } from '../types/vehicle';
import Footer from './Footer';

interface VehicleSubmissionFormProps {
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToCookiePolicy?: () => void;
  onNavigateToTerms?: () => void;
}

interface FormData extends Omit<VehicleSubmission, 'id' | 'created_at' | 'updated_at' | 'status'> {
  year: number | '';
  mileage: number | '';
}

const initialFormData: FormData = {
  owner_name: '',
  owner_email: '',
  owner_phone: '',
  year: '',
  make: '',
  model: '',
  trim: '',
  mileage: '',
  vin: '',
  colour_exterior: '',
  colour_interior: '',
  condition: 'good',
  accident_history: false,
  service_history: '',
  modifications: '',
  issues: '',
  additional_notes: '',
};

export default function VehicleSubmissionForm({ onNavigateToPrivacyPolicy, onNavigateToCookiePolicy, onNavigateToTerms }: VehicleSubmissionFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [agreeVehicleInfo, setAgreeVehicleInfo] = useState(false);
  const [agreePersonalInfo, setAgreePersonalInfo] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'year' || name === 'mileage') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'video') => {
    const files = Array.from(e.target.files || []);
    if (type === 'photo') {
      setPhotos(prev => [...prev, ...files]);
    } else {
      setVideos(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number, type: 'photo' | 'video') => {
    if (type === 'photo') {
      setPhotos(prev => prev.filter((_, i) => i !== index));
    } else {
      setVideos(prev => prev.filter((_, i) => i !== index));
    }
  };

  const uploadFile = async (file: File, submissionId: string, mediaType: 'photo' | 'video', order: number) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${submissionId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('vehicle-media')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('vehicle-media')
      .getPublicUrl(fileName);

    const { error: dbError } = await supabase
      .from('vehicle_media')
      .insert({
        submission_id: submissionId,
        media_type: mediaType,
        file_url: publicUrl,
        file_name: file.name,
        file_size: file.size,
        display_order: order,
      });

    if (dbError) throw dbError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (photos.length < 6) {
        throw new Error('Please upload at least 6 photos of your vehicle');
      }

      if (!agreeVehicleInfo) {
        throw new Error('Please agree to share your vehicle information with potential buyers');
      }

      if (!agreePersonalInfo) {
        throw new Error('Please agree to share your personal details with buyers after payment');
      }

      const submissionData: Omit<VehicleSubmission, 'id' | 'created_at' | 'updated_at' | 'status'> = {
        ...formData,
        year: Number(formData.year),
        mileage: Number(formData.mileage),
      };

      const { data: submission, error: submissionError } = await supabase
        .from('vehicle_submissions')
        .insert(submissionData)
        .select()
        .single();

      if (submissionError) throw submissionError;

      for (let i = 0; i < photos.length; i++) {
        await uploadFile(photos[i], submission.id, 'photo', i);
      }

      for (let i = 0; i < videos.length; i++) {
        await uploadFile(videos[i], submission.id, 'video', i);
      }

      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY;

      await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-submission-emails`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ submissionData }),
        }
      );

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Submission Received!</h2>
            <p className="text-slate-600 mb-6">
              Thank you for submitting your vehicle information. We'll review your submission and get back to you with the best price for your vehicle shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData(initialFormData);
                setPhotos([]);
                setVideos([]);
                setAgreeVehicleInfo(false);
                setAgreePersonalInfo(false);
              }}
              className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Submit Another Vehicle
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Sell Your Vehicle</h1>
          <p className="text-lg text-slate-600">Get the best price for your vehicle in minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="mb-8 bg-slate-50 border-2 border-slate-200 rounded-lg p-6">
            <p className="text-slate-900 text-center font-semibold">
              <AlertCircle className="w-5 h-5 inline-block mr-2 -mt-1" />
              The information provided is essential, as it is used to determine the accurate value of your vehicle. If any of the details are misrepresented or incorrect, the buyer reserves the right to adjust the offered price accordingly. Please note that no refunds will be issued under these circumstances.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-slate-900 mr-2" />
              <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="owner_name"
                  value={formData.owner_name}
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
                  name="owner_email"
                  value={formData.owner_email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="owner_phone"
                  value={formData.owner_phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Car className="w-5 h-5 text-slate-900 mr-2" />
              <h2 className="text-xl font-semibold text-slate-900">Vehicle Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Year *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max="2100"
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Make *</label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Toyota, Ford, BMW"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Model *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Camry, F-150, 3 Series"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Trim</label>
                <input
                  type="text"
                  name="trim"
                  value={formData.trim}
                  onChange={handleInputChange}
                  placeholder="e.g., LE, XLT, M Sport"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Mileage *</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  min="0"
                  required
                  placeholder="Current odometer reading"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">VIN</label>
                <input
                  type="text"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                  placeholder="17-character VIN"
                  maxLength={17}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Exterior Colour *
                </label>
                <input
                  type="text"
                  name="colour_exterior"
                  value={formData.colour_exterior}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., White, Black, Silver"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Interior Colour *
                </label>
                <input
                  type="text"
                  name="colour_interior"
                  value={formData.colour_interior}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Black, Tan, Gray"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-slate-900 mr-2" />
              <h2 className="text-xl font-semibold text-slate-900">Condition & History</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Overall Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow"
                >
                  <option value="excellent">Excellent - Like new</option>
                  <option value="good">Good - Minor wear</option>
                  <option value="fair">Fair - Normal wear</option>
                  <option value="poor">Poor - Significant wear</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="accident_history"
                  checked={formData.accident_history}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900"
                />
                <label className="ml-2 text-sm font-medium text-slate-700">
                  Vehicle has been in an accident
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Service History *
                </label>
                <textarea
                  name="service_history"
                  value={formData.service_history}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="Recent maintenance, repairs, upgrades..."
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Modifications
                </label>
                <textarea
                  name="modifications"
                  value={formData.modifications}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any aftermarket parts or modifications..."
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Known Issues / Damage
                </label>
                <textarea
                  name="issues"
                  value={formData.issues}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any known problems, damage, or needed repairs..."
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="additional_notes"
                  value={formData.additional_notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Anything else we should know..."
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow resize-none"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Upload className="w-5 h-5 text-slate-900 mr-2" />
              <h2 className="text-xl font-semibold text-slate-900">Photos & Videos</h2>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Vehicle Photos * (At least 6 required)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, 'photo')}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-sm text-slate-600">
                    Click to upload photos or drag and drop
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Include exterior, interior, and detail shots
                  </span>
                </label>
              </div>
              {photos.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {photos.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index, 'photo')}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                      <p className="text-xs text-slate-600 mt-1 truncate">{file.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Vehicle Videos (Optional)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => handleFileChange(e, 'video')}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-sm text-slate-600">
                    Click to upload videos or drag and drop
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Walk-around videos are helpful
                  </span>
                </label>
              </div>
              {videos.length > 0 && (
                <div className="mt-4 space-y-2">
                  {videos.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <span className="text-sm text-slate-700 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index, 'video')}
                        className="text-red-500 hover:text-red-700 font-medium text-sm ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-8 space-y-4 bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeVehicleInfo"
                checked={agreeVehicleInfo}
                onChange={(e) => setAgreeVehicleInfo(e.target.checked)}
                className="w-5 h-5 text-slate-900 border-slate-300 rounded focus:ring-slate-900 mt-0.5 flex-shrink-0"
              />
              <label htmlFor="agreeVehicleInfo" className="ml-3 text-sm text-slate-700">
                <span className="font-semibold">I agree to share my vehicle information with potential buyers. *
                </span>
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreePersonalInfo"
                checked={agreePersonalInfo}
                onChange={(e) => setAgreePersonalInfo(e.target.checked)}
                className="w-5 h-5 text-slate-900 border-slate-300 rounded focus:ring-slate-900 mt-0.5 flex-shrink-0"
              />
              <label htmlFor="agreePersonalInfo" className="ml-3 text-sm text-slate-700">
                <span className="font-semibold">I agree that my personal details will be shared with buyers only after I have accepted an offer and paid the service fee. *</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Submitting...
              </>
            ) : (
              'Get My Quote'
            )}
          </button>
        </form>
      </div>
      <Footer
        onNavigateToPrivacyPolicy={onNavigateToPrivacyPolicy}
        onNavigateToCookiePolicy={onNavigateToCookiePolicy}
        onNavigateToTerms={onNavigateToTerms}
      />
    </div>
  );
}
