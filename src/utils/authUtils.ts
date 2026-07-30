type ApiEnvelope<T> = {
  data?: T;
  message?: string;
};

export const getApiErrorMessage = (error: unknown, fallback = 'Something went wrong'): string => {
  if (!error || typeof error !== 'object') return fallback;

  const err = error as {
    status?: number | string;
    data?: { message?: string };
    error?: string;
    message?: string;
  };

  if (err.status === 'FETCH_ERROR' || err.error === 'TypeError: Failed to fetch') {
    return 'Cannot reach the server. Make sure the backend is running on http://localhost:3000';
  }

  return err.data?.message || err.error || err.message || fallback;
};

export const extractApiData = <T>(response: unknown): T | undefined => {
  if (!response || typeof response !== 'object') return undefined;
  const envelope = response as ApiEnvelope<T>;
  return envelope.data ?? (response as T);
};

export const extractAccessToken = (response: unknown): string | undefined => {
  const data = extractApiData<{ access_token?: string; accessToken?: string; token?: string }>(response);
  return data?.access_token || data?.accessToken || data?.token;
};

export const extractSessionToken = (response: unknown): string | undefined => {
  const data = extractApiData<{ session_token?: string; sessionToken?: string }>(response);
  return data?.session_token || data?.sessionToken;
};
