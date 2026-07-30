export type UserProfile = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  date_of_birth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  role: string;
  profile_image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type UpdateProfileDto = {
  full_name?: string;
  date_of_birth?: string | null;
  gender?: 'male' | 'female' | 'other' | null;
};

export type ChangePasswordDto = {
  current_password: string;
  new_password: string;
};

export type Address = {
  id: string;
  label: string;
  full_address: string;
  street: string | null;
  city: string;
  area: string | null;
  province: string | null;
  country: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  is_default: boolean;
};

export type AddressDto = {
  label?: string;
  full_address?: string;
  street?: string;
  city?: string;
  area?: string;
  province?: string;
  country?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  is_default?: boolean;
};
