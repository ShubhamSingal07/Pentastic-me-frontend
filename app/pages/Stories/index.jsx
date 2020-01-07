import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import './style.scss';

import * as Actions from '../../actions';
import StoriesList from '../../components/StoriesList';
import Pagination from '../../components/Pagination';
import StoryLoader from '../../components/Loaders/StoryLoader';
import Error404 from '../../components/Error/Error404';
import Error500 from '../../components/Error/Error500';

class Stories extends React.Component {
  state = {
    loading: false,
    notFound: false,
  };

  abortController = new AbortController();

  async componentDidMount() {
    const { fetchStories, match, loggedIn } = this.props;
    const page = match.params.pageNo;
    this.setState({ loading: true, notFound: false });
    if (page > 0) {
      const isAborted = await fetchStories({ page, loggedIn, signal: this.abortController.signal });
      if (isAborted === true) return;
    } else this.setState({ notFound: true, loading: false });
    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps) {
    const { match, fetchStories, loggedIn } = this.props;
    const page = match.params.pageNo;
    if (prevProps.match.params.pageNo !== page) {
      this.setState({ loading: true, notFound: false });
      if (page > 0) {
        const isAborted = await fetchStories({ page, loggedIn, signal: this.abortController.signal });
        if (isAborted === true) return;
      } else this.setState({ notFound: true, loading: false });
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    const { loading, notFound } = this.state;
    const { stories, match } = this.props;

    if (loading) return <StoryLoader />;

    if (stories.error) return <Error500 message={stories.error.message} />;

    if (notFound) return <Error404 />;

    return (
      <div className="stories-page page">
        <Helmet>
          <title>Stories | PentasticMe</title>
        </Helmet>
        <h1 className="stories-heading pt-3">
          <div className="header-div">Stories</div>
        </h1>
        <StoriesList stories={stories.data} />
        <Pagination pages={stories.pages} currentpage={match.params.pageNo} isStoryPage={true} />
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
