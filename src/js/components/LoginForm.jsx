import React from 'react';
// import { Field, Form } from 'formik';

import Button from './Button';

const LoginForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div className={errors.username && touched.username ? 'form-group has-error' : 'form-group'}>
      <label htmlFor="username" className="form-label">
        Username
      </label>
      <input
        id="username"
        placeholder="Enter your username"
        type="text"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-control"
      />
      {errors.username &&
        touched.username && <div className="form-feedback">{errors.username}</div>}
    </div>

    <div className={errors.password && touched.password ? 'form-group has-error' : 'form-group'}>
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        id="password"
        placeholder="Enter your password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-control"
      />
      {errors.password &&
        touched.password && <div className="form-feedback">{errors.password}</div>}
    </div>

    <div className="form-group">
      <small>
        <a href="#" className="t-grey mr-2">
          Register
        </a>|<a href="#" className="t-grey ml-2">
          Forgot your password?
        </a>
      </small>
    </div>

    <Button type="submit" loading={isSubmitting} variant="primary block">
      Submit
    </Button>
  </form>
);

export default LoginForm;
