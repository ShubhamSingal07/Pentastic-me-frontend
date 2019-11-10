import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import './style.scss';

import * as Actions from '../../actions';
import DraftsList from '../../components/DraftsList';
import DraftsLoader from '../../components/Loaders/DraftsLoader';
import Error500 from '../../components/Error/Error500';
import ErrorMessage from '../../components/Error/ErrorMessage';

class Drafts extends React.Component {
  state = {
    loading: false,
  };

  abortController = new AbortController();

  async componentDidMount() {
    const { fetchDrafts, loggedIn } = this.props;
    this.setState({ loading: true });
    const isAborted = await fetchDrafts({ loggedIn, signal: this.abortController.signal });
    if (isAborted === true) return;
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    const { loading } = this.state;
    const { drafts } = this.props;

    if (loading) return <DraftsLoader />;

    if (drafts.error && drafts.error.status === 500) return <Error500 />;

    return (
      <div className="drafts-page container-fluid page">
        <Helmet>
          <title>Drafts | PentasticMe</title>
        </Helmet>
        <h2 className="drafts-heading pt-3">
          <div className="header-div">Drafts</div>
        </h2>
        {drafts.error ? <ErrorMessage message={drafts.error.message} /> : null}
        <DraftsList drafts={drafts.data} />
      </div>
    );
  }
}

const mapStateToProps = ({ drafts, auth }) => ({
  drafts,
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  fetchDrafts: payload => dispatch(Actions.fetchDrafts(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drafts);
