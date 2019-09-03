import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './style.scss';
import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';

class Write extends React.Component {
  state = {
    loading: false,
  };

  async componentWillMount() {
    const { refresh, loggedIn } = this.props;
    this.setState({ loading: true });
    await refresh({ loggedIn });
    this.setState({ loading: false });
  }

  render() {
    const { loading, storyHtml, error } = this.state;
    const { loggedIn, role } = this.props;

    if (loading) return <div>Loading</div>;

    if (!loggedIn) return (window.location.href = process.env.OAUTH_URL);

    if (role !== 'Admin') return <Redirect to="/" />;

    return (
      <div className="write-page">
        <ReactQuillEditor value={storyHtml} writePage={true} />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  role: user.data.role,
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  refresh: payload => dispatch(Actions.refresh(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Write);
