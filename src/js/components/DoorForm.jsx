import React from 'react';
// import { Field, Form } from 'formik';

import Button from './Button';

const DoorForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div className={errors.name && touched.name ? 'form-group has-error' : 'form-group'}>
      <label htmlFor="name" className="form-label">
        Door name *
      </label>
      <input
        id="name"
        placeholder="Enter the door name"
        type="text"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-control"
      />
      {errors.name && touched.name && <div className="form-feedback">{errors.name}</div>}
    </div>

    <div className={errors.location && touched.location ? 'form-group has-error' : 'form-group'}>
      <label htmlFor="location" className="form-label">
        Location *
      </label>
      <input
        id="location"
        placeholder="Enter the door location"
        type="text"
        value={values.location}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-control"
      />
      {errors.location &&
        touched.location && <div className="form-feedback">{errors.location}</div>}
    </div>

    <div
      className={errors.description && touched.description ? 'form-group has-error' : 'form-group'}
    >
      <label htmlFor="description" className="form-label">
        Description
      </label>
      <input
        id="description"
        placeholder="Enter some usefull description"
        type="text"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-control"
      />
      {errors.description &&
        touched.description && <div className="form-feedback">{errors.description}</div>}
    </div>

    <Button type="submit" loading={isSubmitting} variant="primary block">
      Submit
    </Button>
  </form>
);

export default DoorForm;
