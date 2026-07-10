import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@services/authService';
import { useDispatch } from 'react-redux';
import { loggedIn } from '@redux/slices/authSlice';
import { setAccessTokenCookie } from '@utils/cookieUtils';
import { Button, FormInput } from '@components';

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={async (values) => {
        const res: any = await login(values).unwrap();
        const accessToken = res?.payload?.accessToken || res?.accessToken || res?.token;
        const user = res?.payload?.user || res?.user;
        if (accessToken) {
          setAccessTokenCookie(accessToken);
        }
        dispatch(loggedIn({ token: accessToken, user }));
        navigate('/admin');
      }}>
        {({ values, handleChange, handleBlur }) => (
          <Form className="space-y-4">
            <FormInput label="Email" name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
            <FormInput label="Password" name="password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

