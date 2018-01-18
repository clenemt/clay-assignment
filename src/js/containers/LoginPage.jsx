import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import Yup from 'yup';

import Alert from '../components/Alert';
import LoginForm from '../components/LoginForm';
import authService from '../services/authService';

/**
 * The container for the login page.
 */
class LoginPage extends React.Component {
  constructor() {
    super();

    this.initialValues = {
      username: '',
      password: '',
    };

    this.validationSchema = Yup.object().shape({
      username: Yup.string()
        .min(3, 'Invalid username')
        .required('Username is required!'),
      password: Yup.string()
        .min(3, 'Invalid password')
        .required('Password is required!'),
    });

    this.state = {
      showError: false,
    };
  }

  /**
   * If submit succeeds, switch route to `/users`
   * otherwise show an `Alert`.
   */
  onSubmit = ({ username, password }, { setSubmitting }) => {
    authService
      .login(username, password)
      .then(() => this.props.history.push('/users'))
      .catch(() => {
        this.setState({ showError: true });
        setSubmitting(false);
      });
  };

  render() {
    return (
      <div className="site__login">
        <div className="container">
          <h2 className="t-center mb-4">Login to your account.</h2>

          <div className="card card--small mx-auto">
            {this.state.showError && <Alert variant="error">Invalid username or password.</Alert>}

            <Formik
              validationSchema={this.validationSchema}
              initialValues={this.initialValues}
              onSubmit={this.onSubmit}
              render={LoginForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
