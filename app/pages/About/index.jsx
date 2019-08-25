import React from 'react';
import { connect } from 'react-redux';

import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';

class About extends React.Component {
  state = {
    aboutHtml: '',
    loading: false,
    readOnly: true,
    showSave: false,
  };

  componentDidMount() {
    const { about } = this.state;
    this.setState({
      loading: true,
    });
    fetchAbout();
    this.setState({
      loading: false,
      aboutHtml: about.data,
    });
  }

  handleAboutChange = html => {
    this.setState({
      aboutHtml: html,
    });
  };

  handleEditClick = () => {
    this.setState({
      readOnly: false,
      showSave: true,
    });
  };

  handleSaveClick = () => {
    const { aboutHtml } = this.state;
    Actions.addAbout(aboutHtml);
    this.setState({
      readOnly: true,
      showSave: false,
    });
  };

  render() {
    const { loading, readOnly, showSave, aboutHtml } = this.state;
    const { about, role } = this.props;
    if (loading) {
      return <div>Loading</div>;
    }
    if (about.error) {
      return <div>{about.error}</div>;
    }
    return (
      <div>
        <h1>About me</h1>
        {role === 'Admin' && !showSave? (
          <div>
            <button onClick={this.handleEditClick}>Edit</button>
          </div>
        ) : null}
        {showSave ? <button onClick={this.handleSaveClick}>Save</button> : null}
        <ReactQuillEditor readOnly={readOnly} value={aboutHtml} handleChange={handleAboutChange} />
      </div>
    );
  }
}

const mapStateToProps = ({ about, user }) => ({
  about,
  role: user.data.role,
});

const mapDispatchToProps = dispatch => ({
  fetchAbout: () => dispatch(Actions.fetchAbout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(About);
