import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';

class Contact extends React.Component {
  state = {
    contactHtml: '',
    loading: false,
    readOnly: true,
    showSave: false,
  };

  async componentDidMount() {
    const { fetchContact, loggedIn } = this.props;
    this.setState({ loading: true });
    const data = await fetchContact({ loggedIn });
    this.setState({ loading: false, contactHtml: data });
  }

  handleContactChange = html => {
    this.setState({
      contactHtml: html,
    });
  };

  handleEditClick = () => {
    this.setState({
      readOnly: false,
      showSave: true,
    });
  };

  handleSaveClick = async () => {
    const { contactHtml } = this.state;
    await Actions.addContact(contactHtml);
    this.setState({ readOnly: true, showSave: false });
  };

  render() {
    const { loading, readOnly, showSave, contactHtml } = this.state;
    const { contact, role } = this.props;

    if (loading) {
      return <div className="contact-page">Loading</div>;
    }

    return (
      <div className="contact-page">
        <h2>Contact</h2>
        {contact.error ? <div>{contact.error}</div> : null}
        {role === 'Admin' && !showSave ? (
          <div>
            <button onClick={this.handleEditClick}>Edit</button>
          </div>
        ) : null}
        {showSave ? <button onClick={this.handleSaveClick}>Save</button> : null}
        <ReactQuillEditor readOnly={readOnly} value={contactHtml} handleChange={this.handleContactChange} />
      </div>
    );
  }
}

const mapStateToProps = ({ contact, user, auth }) => ({
  contact,
  role: user.data.role,
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  fetchContact: payload => dispatch(Actions.fetchContact(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contact);
