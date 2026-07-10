import { useSelector } from 'react-redux';

export type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  user: { name?: string; email?: string; role?: string } | null;
  role: string | null;
};

export const useAuth = () => {
  const { isLoggedIn, token, user, role } = useSelector((s: { auth: AuthState }) => s.auth);
  return { isLoggedIn, token, user, role };
};

