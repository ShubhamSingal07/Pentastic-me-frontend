import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import './style.scss';

import * as Actions from '../../actions';
import ErrorMessage from '../../components/Error/ErrorMessage';
import CheckmarkAnimation from '../../components/CheckmarkAnimation';

class Contact extends React.Component {
  state = {
    loading: false,
    name: '',
    message: '',
    email: '',
    showEmptyError: false,
    showErrorMessage: false,
    showTickAnimation: false,
  };

  abortController = new AbortController();

  async componentDidMount() {
    const { refresh, loggedIn } = this.props;
    this.setState({ loading: true });
    const data = await refresh({ loggedIn, signal: this.abortController.signal });
    if (data === true) return;
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  handleValueChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitClick = async () => {
    const { name, email, message } = this.state;
    this.setState({ showEmptyError: false, showErrorMessage: false });
    if (name.trim().length === 0 || email.trim().length === 0 || message.trim().length === 0) {
      return this.setState({ showEmptyError: true });
    }
    const data = await Actions.sendMail(name, email, message);
    if (data.error) return this.setState({ showEmptyError: false, showErrorMessage: true });
    this.setState({ showTickAnimation: true });
  };

  render() {
    const { loading, name, email, message, showEmptyError, showErrorMessage, showTickAnimation } = this.state;

    if (loading) return <div />;

    if (showTickAnimation) return <CheckmarkAnimation />;

    return (
      <div className="contact-page page">
        <Helmet>
          <title>Contact Me | PentasticMe</title>
        </Helmet>
        <h2 className="contact-heading pt-3">
          <div className="header-div">Contact Me</div>
        </h2>
        {showEmptyError ? <ErrorMessage message={'Fields can not be empty'} /> : null}
        {showErrorMessage ? <ErrorMessage message={'Oops! Looks like something went wrong'} /> : null}
        <div className="input-container">
          <div className="txt-input">
            <div className="input-label">Name</div>
            <input value={name} className="input-box" type="text" name="name" onChange={this.handleValueChange} />
          </div>
          <div className="txt-input">
            <div className="input-label">Email</div>
            <input value={email} className="input-box" type="email" name="email" onChange={this.handleValueChange} />
          </div>
          <div className="txt-input">
            <div className="input-label">Message</div>
            <textarea
              value={message}
              className="input-box msg-box"
              type="text"
              name="message"
              onChange={this.handleValueChange}
            />
          </div>
          <div className="submit-btn" style={{ textAlign: 'right' }}>
            <button className="btn-blue-grey btn btn-outline-primary" onClick={this.handleSubmitClick}>
              Submit
            </button>
          </div>
        </div>

        <div className="contact-info">
          <div className="card">
            <i className="card-icon far fa-envelope" />
            <p>pentasticme@gmail.com</p>
          </div>
          <div className="card">
            <i className="card-icon fas fa-phone" />
            <p>+91-9313731309</p>
          </div>
          <div className="card">
            <i className="card-icon fas fa-map-marker-alt" />
            <p>New Delhi, India</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contact, user, auth }) => ({
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  refresh: payload => dispatch(Actions.refresh(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contact);
