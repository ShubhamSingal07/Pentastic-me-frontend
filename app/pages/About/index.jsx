import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';

class About extends React.Component {
  state = {
    aboutHtml: '',
    loading: false,
    readOnly: true,
    showSave: false,
  };

  async componentDidMount() {
    const { fetchAbout, loggedIn } = this.props;
    this.setState({ loading: true });
    const body = await fetchAbout({ loggedIn });
    this.setState({ loading: false, aboutHtml: body });
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

  handleSaveClick = async () => {
    const { aboutHtml } = this.state;
    await Actions.addAbout(aboutHtml);
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
    return (
      <div className="about-page">
        <h1>About me</h1>
        <div>
          {about.error ? <div>{about.error}</div> : null}
          {role === 'Admin' && !showSave ? (
            <div>
              <button onClick={this.handleEditClick}>Edit</button>
            </div>
          ) : null}
          {showSave ? <button onClick={this.handleSaveClick}>Save</button> : null}
          <ReactQuillEditor readOnly={readOnly} value={aboutHtml} handleChange={this.handleAboutChange} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ about, user, auth }) => ({
  about,
  role: user.data.role,
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  fetchAbout: payload => dispatch(Actions.fetchAbout(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(About);
