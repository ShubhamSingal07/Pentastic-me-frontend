import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';

class Write extends React.Component {
  state = {
    loading: false,
  };

  abortController = new AbortController();

  async componentWillMount() {
    const { refresh, loggedIn } = this.props;
    this.setState({ loading: true });
    const isAborted = await refresh({ loggedIn, signal: this.abortController.signal });
    if (isAborted === true) return;
    this.setState({ loading: false });
  }

  componentWillUnmpount() {
    this.abortController.abort();
  }

  render() {
    const { loading } = this.state;
    const { loggedIn, user } = this.props;

    if (loading) return <div />;
    if (!loggedIn) return (window.location.href = process.env.OAUTH_URL);
    if (user.role !== 'Admin') return <Redirect to="/" />;

    return (
      <div className="write-page page">
        <Helmet>
          <title>Write a Story | PentasticMe</title>
        </Helmet>
        <ReactQuillEditor value="" writePage={true} />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  user: user.data,
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  refresh: payload => dispatch(Actions.refresh(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Write);
