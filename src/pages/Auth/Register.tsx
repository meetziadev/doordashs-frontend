import React from 'react';
import { Formik, Form } from 'formik';
import { useRegisterMutation } from '@services/authService';
import { Button, FormInput } from '@components';

const Register: React.FC = () => {
  const [register, { isLoading }] = useRegisterMutation();
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      <Formik initialValues={{ name: '', email: '', password: '' }} onSubmit={async (values) => {
        await register(values).unwrap();
        alert('Registered');
      }}>
        {({ values, handleChange, handleBlur }) => (
          <Form className="space-y-4">
            <FormInput label="Name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
            <FormInput label="Email" name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
            <FormInput label="Password" name="password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;

