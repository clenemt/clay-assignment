import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';

import LoginForm from '../components/LoginForm';
import authService from '../services/authService';

class LoginPage extends React.Component {
  onSubmit = ({ username }) => {
    authService.login({ username }).then(() => this.props.history.push('/'));
  };

  render() {
    return <Formik onSubmit={this.onSubmit} component={LoginForm} />;
  }
}

export default withRouter(LoginPage);
