export interface VehicleSubmission {
  id?: string;
  created_at?: string;
  updated_at?: string;
  status?: 'pending' | 'reviewing' | 'quoted' | 'completed';

  owner_name: string;
  owner_email: string;
  owner_phone: string;

  year: number;
  make: string;
  model: string;
  trim?: string;
  mileage: number;
  vin?: string;
  colour_exterior: string;
  colour_interior: string;

  condition: 'excellent' | 'good' | 'fair' | 'poor';
  accident_history: boolean;
  service_history?: string;
  modifications?: string;
  issues?: string;
  additional_notes?: string;
}

export interface VehicleMedia {
  id?: string;
  submission_id: string;
  media_type: 'photo' | 'video';
  file_url: string;
  file_name: string;
  file_size: number;
  uploaded_at?: string;
  display_order: number;
}
