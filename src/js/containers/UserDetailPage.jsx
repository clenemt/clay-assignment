import React from 'react';
import { Formik } from 'formik';
import Yup from 'yup';

import Nav from '../components/Nav';
import UserForm from '../components/UserForm';
import UserDetails from '../components/UserDetails';

import usersStore from '../stores/usersStore';
import usersService from '../services/usersService';

/**
 * The container for the user detail page.
 */
class UserDetailPage extends React.Component {
  constructor(props) {
    super(props);

    // Grab the current user from the location params
    const user = usersStore.get(+props.match.params.id);

    this.initialValues = user || {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      isAdmin: false,
    };

    this.validationSchema = Yup.object().shape({
      firstName: Yup.string()
        .min(3, 'Invalid first name')
        .required('A first name is required!'),
      lastName: Yup.string()
        .min(3, 'Invalid last name')
        .required('a last name is required!'),
      username: Yup.string()
        .min(3, 'Invalid username')
        .required('Username is required!'),
      password: Yup.string()
        .min(3, 'Invalid password')
        .required('Password is required!'),
      email: Yup.string()
        .email('Invalid email')
        .required('Email is required!'),
      phone: Yup.string().matches(
        /^(\([0-9]{3}\)|[0-9]{3}) [0-9]{3}-[0-9]{4}$/,
        'Invalid phone number, please use an english phone number e.g. (472) 718-3655'
      ),
    });

    this.state = { user };
  }

  onSubmit = (values) => {
    usersService.edit(values).then(() => this.props.history.push('/users'));
  };

  render() {
    const isNewUser = !this.state.user;
    const title = isNewUser
      ? 'Add a user'
      : `${this.state.user.firstName} ${this.state.user.lastName}`;
    const buttonLabel = isNewUser ? 'Create' : 'Update';

    return (
      <>
        <Nav title={title} backTo="/users" />
        <div className="container px-2">
          {!isNewUser && <UserDetails user={this.state.user} />}
          <div className="mt-3">
            <Formik
              validationSchema={this.validationSchema}
              initialValues={this.initialValues}
              onSubmit={this.onSubmit}
              render={(formikProps) => <UserForm {...formikProps} {...{ buttonLabel }} />}
            />
          </div>
        </div>
      </>
    );
  }
}

export default UserDetailPage;
