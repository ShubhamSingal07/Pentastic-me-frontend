import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import * as Actions from '../../actions';
import DraftsList from '../../components/DraftsList';

class Drafts extends React.Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    const { fetchDrafts, loggedIn } = this.props;
    this.setState({ loading: true });
    await fetchDrafts({ loggedIn });
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { drafts } = this.props;

    if (loading) return <div className="drafts-page">Loading</div>;

    if (drafts.error) return <div className="drafts-page">{drafts.error}</div>;

    return (
      <div className="drafts-page">
        <h2>Drafts</h2>
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
