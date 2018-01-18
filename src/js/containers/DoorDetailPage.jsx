import Yup from 'yup';
import React from 'react';
import { Formik } from 'formik';

import Nav from '../components/Nav';
import DoorForm from '../components/DoorForm';
import DoorDetails from '../components/DoorDetails';

import doorsStore from '../stores/doorsStore';
import doorsService from '../services/doorsService';

/**
 * The container for the door detaill page.
 */
class DoorDetailPage extends React.Component {
  constructor(props) {
    super(props);

    // Grab the current door from the location params
    const door = doorsStore.get(+props.match.params.id);

    this.initialValues = door || {
      name: '',
      location: '',
      description: '',
    };

    this.validationSchema = Yup.object().shape({
      name: Yup.string()
        .min(3, 'Invalid door name')
        .required('A door name is required!'),
      location: Yup.string()
        .min(3, 'Invalid location name')
        .required('A door location is required!'),
      description: Yup.string().min(3, 'Invalid description'),
    });

    this.state = { door };
  }

  onSubmit = (values) => {
    doorsService
      .edit(Object.assign({ status: 'close', mode: 'normal' }, values))
      .then(() => this.props.history.push('/doors'));
  };

  render() {
    const isNewDoor = !this.state.door;
    const title = isNewDoor ? 'Add a door' : `${this.state.door.name}`;

    return (
      <>
        <Nav title={title} backTo="/doors" />
        <div className="container px-2">
          {!isNewDoor && <DoorDetails door={this.state.door} />}
          <div className="mt-3">
            <Formik
              validationSchema={this.validationSchema}
              initialValues={this.initialValues}
              onSubmit={this.onSubmit}
              render={DoorForm}
            />
          </div>
        </div>
      </>
    );
  }
}

export default DoorDetailPage;
