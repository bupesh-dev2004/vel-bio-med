import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export interface PublicInquiryPayload {
  contact_person: string;
  mobile_number: string;
  email: string;
  device?: string | null;
  message?: string | null;
}

export interface PublicInquiryResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    contact_person: string;
    mobile_number: string;
    email: string;
    device?: string | null;
    message?: string | null;
    status: string;
    created_at: string;
    updated_at: string;
  };
}

export const submitPublicInquiry = async (
  payload: PublicInquiryPayload
): Promise<PublicInquiryResponse> => {
  const normalizedBase = API_BASE_URL.replace(/\/+$/, '');
  const endpoint = normalizedBase.endsWith('/api')
    ? '/public/inquiry'
    : '/api/public/inquiry';

  const response = await apiClient.post<PublicInquiryResponse>(endpoint, payload);
  return response.data;
};
