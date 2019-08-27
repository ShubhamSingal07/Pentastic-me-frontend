import React from 'react';
import { connect } from 'react-redux';

import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';

class Contact extends React.Component {
  state = {
    contactHtml: '',
    loading: false,
    readOnly: true,
    showSave: false,
  };
  
  componentDidMount() {
    const { about } = this.state;
    const { fetchContact } = this.props;
    this.setState({
      loading: true,
    });
    fetchContact();
    this.setState({
      loading: false,
      aboutHtml: about.data,
    });
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

  handleSaveClick = () => {
    const { contactHtml } = this.state;
    Actions.addAbout(contactHtml);
    this.setState({
      readOnly: true,
      showSave: false,
    });
  };

  render() {
    const { loading, readOnly, showSave, contactHtml } = this.state;
    const { contact, role } = this.props;
    if (loading) {
      return <div>Loading</div>;
    }
    if (contact.error) {
      return <div>{contact.error}</div>;
    }
    return (
      <div>
        <h1>Contact</h1>
        {role === 'Admin' && !showSave ? (
          <div>
            <button onClick={this.handleEditClick}>Edit</button>
          </div>
        ) : null}
        {showSave ? <button onClick={this.handleSaveClick}>Save</button> : null}
        <ReactQuillEditor readOnly={readOnly} value={contactHtml} handleChange={handleContactChange} />
      </div>
    );
  }
}

const mapStateToProps = ({ contact, user }) => ({
  contact,
  role: user.data.role,
});

const mapDispatchToProps = dispatch => ({
  fetchContact: () => dispatch(Actions.fetchContact()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contact);
