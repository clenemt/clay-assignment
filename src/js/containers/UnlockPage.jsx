import React from 'react';
import Confetti from 'react-dom-confetti';

import Button from '../components/Button';

import doorsStore from '../stores/doorsStore';
import doorsService from '../services/doorsService';

import { defaultDoor } from '../utils/variables';

/**
 * The container for the unlock a door page.
 */
class UnlockPage extends React.Component {
  constructor(props) {
    super(props);

    this.door = doorsStore.get(+props.match.params.id);
    this.state = {
      status: this.door.status,
      loading: false,
      submitted: false,
    };
  }

  onButtonClick = () => {
    const newStatus = this.state.status === 'open' ? 'close' : 'open';
    const serviceMethod = this.state.status === 'open' ? 'lock' : 'unlock';

    // Make it spin!
    this.setState({
      loading: true,
      submitted: false,
    });

    doorsService[serviceMethod](this.door)
      .then(() => this.setState({ status: newStatus }))
      .finally(() =>
        this.setState({
          loading: false,
          submitted: true,
        })
      );
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const buttonText = this.state.status === 'close' ? 'Unlock' : 'Lock';
    const config = {
      angle: 90,
      spread: 60,
      startVelocity: 20,
      elementCount: 40,
      decay: 0.95,
    };

    return (
      <div className="lock-screen">
        <div className="lock-screen__wrapper t-center">
          <button onClick={this.onClose} className="lock-screen__close">
            &times;
          </button>
          <img src={defaultDoor} className="lock-screen__img" alt="Door" />
          <h1 className="t-black mb-3">{this.door.name}</h1>
          <Button variant="lg unlock" loading={this.state.loading} onClick={this.onButtonClick}>
            {buttonText}
            <Confetti active={this.state.submitted} config={config} />
          </Button>
        </div>
      </div>
    );
  }
}

export default UnlockPage;
