import React from 'react';
import { connect } from 'react-redux';

import * as Actions from '../../actions';
import Navbar from '../../components/Navbar';
import DraftsList from '../../components/DraftsList';

class Drafts extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    const { fetchDrafts } = this.props;
    this.setState({ loading: true });
    fetchDrafts();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { drafts } = this.props;

    if (loading) return <div>Loading</div>;

    if (drafts.error) return <div>{drafts.error}</div>;

    return (
      <div>
        <Navbar />
        <DraftsList drafts={drafts.data} />
      </div>
    );
  }
}

const mapStateToProps = ({ drafts }) => ({
  drafts,
});

const mapDispatchToProps = dispatch => ({
  fetchDrafts: () => dispatch(Actions.fetchDrafts()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drafts);
