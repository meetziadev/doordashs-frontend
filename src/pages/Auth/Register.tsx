import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  useSendVerificationMutation,
  useVerifyCodeMutation,
  useRegisterMutation
} from '@services/authService';
import { loggedIn } from '@redux/slices/authSlice';
import { setAccessTokenCookie } from '@utils/cookieUtils';
import { extractAccessToken, extractSessionToken, getApiErrorMessage } from '@utils/authUtils';
import { FormInput } from '@/components';
import { useToastContext } from '@components/Toast';
import AuthShell from './AuthShell';

type RegisterStep = 'email' | 'emailOtp' | 'phone' | 'phoneOtp' | 'details';

const STEPS: RegisterStep[] = ['email', 'emailOtp', 'phone', 'phoneOtp', 'details'];

const STEP_TITLES: Record<RegisterStep, string> = {
  email: 'Verify your email',
  emailOtp: 'Enter email verification code',
  phone: 'Verify your phone number',
  phoneOtp: 'Enter phone verification code',
  details: 'Complete your profile'
};

const inputClassName =
  'w-full border border-gray-200 bg-[#F9FAFB] rounded-[6px] px-4 py-3 text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-[15px]';

const BLIPSGO_ADMIN_URL = 'https://www.blipsgo.com/admin';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: showError, success: showSuccess } = useToastContext();

  const [step, setStep] = useState<RegisterStep>('email');
  const [sessionToken, setSessionToken] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [sendVerification, { isLoading: isSending }] = useSendVerificationMutation();
  const [verifyCode, { isLoading: isVerifying }] = useVerifyCodeMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const stepIndex = STEPS.indexOf(step);

  const goBack = () => {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1]);
  };

  const handleSendEmailCode = async (identifier: string) => {
    try {
      const res = await sendVerification({ identifier }).unwrap();
      const token = extractSessionToken(res);
      if (!token) {
        showError('Could not start verification. Please try again.');
        return;
      }
      setSessionToken(token);
      setEmail(identifier);
      setStep('emailOtp');
      showSuccess('Verification code sent to your email');
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to send verification code'));
    }
  };

  const handleVerifyEmailCode = async (code: string) => {
    try {
      await verifyCode({ session_token: sessionToken, code }).unwrap();
      setStep('phone');
      showSuccess('Email verified successfully');
    } catch (error) {
      showError(getApiErrorMessage(error, 'Invalid verification code'));
    }
  };

  const handleSendPhoneCode = async (identifier: string) => {
    try {
      const res = await sendVerification({ session_token: sessionToken, identifier }).unwrap();
      const token = extractSessionToken(res);
      if (token) setSessionToken(token);
      setPhone(identifier);
      setStep('phoneOtp');
      showSuccess('Verification code sent to your phone');
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to send phone verification code'));
    }
  };

  const handleVerifyPhoneCode = async (code: string) => {
    try {
      const res = await verifyCode({ session_token: sessionToken, code }).unwrap();
      const token = extractSessionToken(res);
      if (token) setSessionToken(token);
      setStep('details');
      showSuccess('Phone verified successfully');
    } catch (error) {
      showError(getApiErrorMessage(error, 'Invalid verification code'));
    }
  };

  const handleRegister = async (fullName: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    try {
      const res = await register({
        session_token: sessionToken,
        full_name: fullName,
        password
      }).unwrap();

      const accessToken = extractAccessToken(res);
      if (!accessToken) {
        showSuccess('Account created successfully. Please log in.');
        navigate('/login');
        return;
      }

      setAccessTokenCookie(accessToken);
      dispatch(loggedIn({ token: accessToken, user: null }));
      showSuccess('Account created successfully');
      window.location.assign(BLIPSGO_ADMIN_URL);
    } catch (error) {
      showError(getApiErrorMessage(error, 'Registration failed'));
    }
  };

  const isBusy = isSending || isVerifying || isRegistering;

  return (
    <AuthShell
      headerLink={
        <>
          <span>Already registered?</span>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline ml-1 cursor-pointer font-semibold"
          >
            Login Here
          </button>
        </>
      }
    >
      <div className="flex items-center gap-2 mb-6">
        {STEPS.map((s, index) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              index <= stepIndex ? 'bg-black' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <h1 className="text-[18px] sm:text-[22px] font-bold text-gray-950 leading-tight">
        {STEP_TITLES[step]}
      </h1>
      <p className="text-sm text-gray-500 mt-2">
        Step {stepIndex + 1} of {STEPS.length}
      </p>

      {step === 'email' && (
        <Formik
          initialValues={{ email: '' }}
          onSubmit={async (values) => handleSendEmailCode(values.email.trim())}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className="space-y-5 mt-8">
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Please enter your email"
                inputClassName={inputClassName}
              />
              <button
                type="submit"
                disabled={isBusy}
                className="w-full bg-black hover:bg-zinc-800 text-white rounded-[6px] py-3.5 font-medium text-base transition-all cursor-pointer disabled:opacity-60"
              >
                {isSending ? 'Sending code...' : 'Send verification code'}
              </button>
            </Form>
          )}
        </Formik>
      )}

      {step === 'emailOtp' && (
        <Formik
          initialValues={{ code: '' }}
          onSubmit={async (values) => handleVerifyEmailCode(values.code.trim())}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className="space-y-5 mt-8">
              <p className="text-sm text-gray-600">
                We sent a code to <span className="font-semibold">{email}</span>
              </p>
              <FormInput
                label="Verification code"
                name="code"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter 6-digit code"
                maxLength={6}
                inputClassName={inputClassName}
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex-1 border border-gray-200 rounded-[6px] py-3.5 font-medium text-base cursor-pointer hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isBusy}
                  className="flex-1 bg-black hover:bg-zinc-800 text-white rounded-[6px] py-3.5 font-medium text-base cursor-pointer disabled:opacity-60"
                >
                  {isVerifying ? 'Verifying...' : 'Verify email'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {step === 'phone' && (
        <Formik
          initialValues={{ phone: '' }}
          onSubmit={async (values) => handleSendPhoneCode(values.phone.trim())}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className="space-y-5 mt-8">
              <FormInput
                label="Phone number"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+923001234567"
                inputClassName={inputClassName}
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex-1 border border-gray-200 rounded-[6px] py-3.5 font-medium text-base cursor-pointer hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isBusy}
                  className="flex-1 bg-black hover:bg-zinc-800 text-white rounded-[6px] py-3.5 font-medium text-base cursor-pointer disabled:opacity-60"
                >
                  {isSending ? 'Sending code...' : 'Send verification code'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {step === 'phoneOtp' && (
        <Formik
          initialValues={{ code: '' }}
          onSubmit={async (values) => handleVerifyPhoneCode(values.code.trim())}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className="space-y-5 mt-8">
              <p className="text-sm text-gray-600">
                We sent a code to <span className="font-semibold">{phone}</span>
              </p>
              <FormInput
                label="Verification code"
                name="code"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter 6-digit code"
                maxLength={6}
                inputClassName={inputClassName}
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex-1 border border-gray-200 rounded-[6px] py-3.5 font-medium text-base cursor-pointer hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isBusy}
                  className="flex-1 bg-black hover:bg-zinc-800 text-white rounded-[6px] py-3.5 font-medium text-base cursor-pointer disabled:opacity-60"
                >
                  {isVerifying ? 'Verifying...' : 'Verify phone'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {step === 'details' && (
        <Formik
          initialValues={{ fullName: '', password: '', confirmPassword: '' }}
          onSubmit={async (values) =>
            handleRegister(values.fullName.trim(), values.password, values.confirmPassword)
          }
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className="space-y-5 mt-8">
              <FormInput
                label="Full name"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Please enter your full name"
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
              <FormInput
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm password"
                inputClassName={`${inputClassName} pl-4 pr-12`}
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex-1 border border-gray-200 rounded-[6px] py-3.5 font-medium text-base cursor-pointer hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isBusy}
                  className="flex-1 bg-black hover:bg-zinc-800 text-white rounded-[6px] py-3.5 font-medium text-base cursor-pointer disabled:opacity-60"
                >
                  {isRegistering ? 'Creating account...' : 'Sign up'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </AuthShell>
  );
};

export default Register;
