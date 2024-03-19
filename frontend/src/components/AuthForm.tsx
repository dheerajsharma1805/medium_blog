import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface FormValues {
  name?: string;
  username: string;
  password: string;
}

interface Props {
  isSignUp: boolean;
  onSubmit: (values: FormValues) => void;
}

const AuthForm: React.FC<Props> = ({ isSignUp, onSubmit }) => {
  return (
    <div className="max-w-md mx-auto">
      <Formik
        initialValues={{ name: '', username: '', password: '' }}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.setSubmitting(false);
        }}
        validate={(values) => {
          const errors: Partial<FormValues> = {};
          if (isSignUp && !values.name) {
            errors.name = 'Required';
          }
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
      >
        <Form className="px-8 pt-6 pb-8 mb-4">
          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <Field id="name" name="name" type="text" className="shadow appearance-none border rounded w-full p-2.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <Field id="username" name="username" type="text" className="shadow appearance-none border rounded w-full p-2.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <Field id="password" name="password" type="password" className="shadow appearance-none border rounded w-full p-2.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AuthForm;
