import React from 'react';
import { Field, Form } from 'formik';

const LoginForm = () => (
  <Form>
    <Field type="text" name="username" placeholder="Username" />
    <Field type="password" name="password" placeholder="Password" />
    <button type="submit">Login</button>
  </Form>
);

export default LoginForm;
