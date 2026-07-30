import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@services/authService';
import { useDispatch } from 'react-redux';
import { loggedIn } from '@redux/slices/authSlice';
import { setAccessTokenCookie } from '@utils/cookieUtils';
import { extractAccessToken, getApiErrorMessage } from '@utils/authUtils';
import { FormInput } from '@/components';
import { useToastContext } from '@components/Toast';
import AuthShell from './AuthShell';

const inputClassName =
  'w-full border border-gray-200 bg-[#F9FAFB] rounded-[6px] px-4 py-3 text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-[15px]';

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: showError, success: showSuccess } = useToastContext();

  return (
    <AuthShell
      headerLink={
        <>
          <span>Not registered?</span>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline ml-1 cursor-pointer font-semibold"
          >
            Create an account
          </button>
        </>
      }
    >
      <span className="text-[14px] font-medium text-gray-500 flex items-center gap-1.5">
        Welcome back! <span role="img" aria-label="wave">👋</span>
      </span>
      <h1 className="text-[18] sm:text-[22px] font-bold text-gray-950 mt-2 leading-tight">
        Login to your account
      </h1>

      <Formik
        initialValues={{ identifier: '', password: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await login(values).unwrap();
            const accessToken = extractAccessToken(res);
            if (!accessToken) {
              showError('Login failed. No access token received.');
              return;
            }

            setAccessTokenCookie(accessToken);
            dispatch(loggedIn({ token: accessToken, user: null }));
            showSuccess('Logged in successfully');
            navigate('/admin');
          } catch (error) {
            showError(getApiErrorMessage(error, 'Invalid email/phone or password'));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form className="space-y-5 mt-8">
            <FormInput
              label="Email or Phone"
              name="identifier"
              type="text"
              value={values.identifier}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email or phone number"
              inputClassName={inputClassName}
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter password"
              inputClassName={`${inputClassName} pl-4 pr-12`}
            />

            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full bg-black hover:bg-zinc-800 text-white rounded-[6px] py-3.5 text-center font-medium text-base transition-all active:scale-98 cursor-pointer mt-6 disabled:opacity-60"
            >
              {isLoading || isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>

      <div className="relative flex py-2 items-center mt-6">
        <div className="flex-grow border-t border-gray-200" />
        <span className="flex-shrink mx-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">
          Or
        </span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      <div className="text-left">
        <p className="text-sm font-semibold text-gray-500 mb-2.5">Login using</p>
        <div className="flex gap-4">
          <button
            type="button"
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Login with Google"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </button>

          <button
            type="button"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-[#1877F2] hover:bg-[#166FE5] transition-colors cursor-pointer shadow-sm"
            aria-label="Login with Facebook"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
            </svg>
          </button>
        </div>
      </div>
    </AuthShell>
  );
};

export default Login;
