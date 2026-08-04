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

const BLIPSGO_ADMIN_URL = 'https://www.blipsgo.com/admin';

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
            window.location.assign(BLIPSGO_ADMIN_URL);
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

    </AuthShell>
  );
};

export default Login;
