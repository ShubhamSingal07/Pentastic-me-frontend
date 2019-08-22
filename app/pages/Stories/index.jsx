import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/Navbar';
import StoriesList from '../../components/StoriesList';
import * as Actions from '../../actions';

class Stories extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    const { fetchStories, match } = this.props;
    const page = match.params.pageNo;
    this.setState({ loading: true });
    fetchStories({ page, loggedIn });
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { stories } = this.props;
    if (loading) return <div>Loading</div>;
    if (stories.error) return <div>{stories.error}</div>;
    return (
      <div>
        <Navbar />
        <StoriesList stories={stories.data} />
      </div>
    );
  }
}

const mapStateToProps = ({ stories, auth }) => ({
  loggedIn: auth.loggedIn,
  stories,
});

const mapDispatchToProps = dispatch => ({
  fetchStories: payload => dispatch(Actions.fetchStories(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stories);
