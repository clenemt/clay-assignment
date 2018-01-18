import React from 'react';
// import { Field, Form } from 'formik';

import Button from './Button';

const UserForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  buttonLabel,
}) => (
  <form onSubmit={handleSubmit}>
    <div className={errors.firstName && touched.firstName ? 'form-group has-error' : 'form-group'}>
      <label htmlFor="firstName" className="form-label">
        First name *
      </label>
      <input
        id="firstName"
        placeholder="Enter your first name"
        type="text"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-control"
      />
      {errors.firstName &&
        touched.firstName && <div className="form-feedback">{errors.firstName}</div>}
    </div>

    <div className={errors.lastName && touched.lastName ? 'form-group has-error' : 'form-group'}>
      <label htmlFor="lastName" className="form-label">
        Last name *
      </label>
      <input
        id="lastName"
        placeholder="Enter your last name"
        type="text"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-control"
      />
      {errors.lastName &&
        touched.lastName && <div className="form-feedback">{errors.lastName}</div>}
    </div>

    <div className={errors.email && touched.email ? 'form-group has-error' : 'form-group'}>
      <label htmlFor="email" className="form-label">
        Email *
      </label>
      <input
        id="email"
        placeholder="Enter your email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-control"
      />
      {errors.email && touched.email && <div className="form-feedback">{errors.email}</div>}
    </div>

    <div className={errors.phone && touched.phone ? 'form-group has-error' : 'form-group'}>
      <label htmlFor="phone" className="form-label">
        Phone number
      </label>
      <input
        id="phone"
        placeholder="Enter your phone number"
        type="text"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-control"
      />
      {errors.phone && touched.phone && <div className="form-feedback">{errors.phone}</div>}
    </div>

    <div className={errors.username && touched.username ? 'form-group has-error' : 'form-group'}>
      <label htmlFor="username" className="form-label">
        Username *
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
        Password *
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

    <Button type="submit" loading={isSubmitting} variant="primary block">
      {buttonLabel}
    </Button>
  </form>
);

export default UserForm;
