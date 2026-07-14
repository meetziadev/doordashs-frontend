import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@services/authService';
import { FormInput } from '@/components';
import { loginBg } from '@assets/images';

const Register: React.FC = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-left font-arial">
      {/* Left Column: Illustration & Light Blue Background */}
      <div className="hidden lg:flex lg:w-[38%] bg-[#F4F9FF] items-center justify-center p-12 select-none h-screen fixed left-0 top-0">
        <img
          src={loginBg}
          alt="Authentication Security Illustration"
          className="max-w-[85%] max-h-[85%] object-contain"
        />
      </div>

      {/* Right Column: Form fields */}
      <div className="w-full lg:w-[62%] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 min-h-screen bg-white overflow-y-auto ml-auto">
        {/* Top Header Link */}
        <div className="flex justify-end text-sm sm:text-[15px] font-medium text-gray-500">
          <span>Already registered?</span>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline ml-1 cursor-pointer font-semibold"
          >
            Login Here
          </button>
        </div>

        {/* Centered Register Form container */}
        <div className="max-w-[420px] w-full mx-auto my-auto py-8">
          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            onSubmit={async (values) => {
              if (values.password !== values.confirmPassword) {
                alert('Passwords do not match');
                return;
              }
              await register({
                name: values.name,
                email: values.email,
                password: values.password
              }).unwrap();
              setIsSuccess(true);
            }}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form className="space-y-5">
                <FormInput
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Please enter your Name"
                  inputClassName="w-full border border-gray-200 bg-[#F9FAFB] rounded-[6px] px-4 py-3 text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-[15px]"
                />

                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Please enter your email"
                  inputClassName="w-full border border-gray-200 bg-[#F9FAFB] rounded-[6px] px-4 py-3 text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-[15px]"
                />

                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter password"
                  inputClassName="w-full border border-gray-200 bg-[#F9FAFB] rounded-[6px] pl-4 pr-12 py-3 text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-[15px]"
                />

                <FormInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter password"
                  inputClassName="w-full border border-gray-200 bg-[#F9FAFB] rounded-[6px] pl-4 pr-12 py-3 text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-[15px]"
                />

                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black hover:bg-zinc-800 text-white rounded-[6px] py-3.5 text-center font-medium text-base transition-all active:scale-98 cursor-pointer mt-6"
                >
                  {isLoading ? 'Registering...' : 'Sign Up'}
                </button>
              </Form>
            )}
          </Formik>

          {/* Success Link or Default redirect banner below */}
          {(isSuccess || true) && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Successfully Registered Click Here To Login
              </button>
            </div>
          )}
        </div>

        {/* Empty placeholder footer to maintain space-between visual hierarchy */}
        <div />
      </div>
    </div>
  );
};

export default Register;

