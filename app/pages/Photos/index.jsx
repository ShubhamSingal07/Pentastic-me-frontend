import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import './style.scss';

import * as Actions from '../../actions';
import PhotosList from '../../components/PhotosList';
import Pagination from '../../components/Pagination';
import PhotoLoadingAnimation from '../../components/Loaders/PhotoLoader';
import Error404 from '../../components/Error/Error404';
import Error500 from '../../components/Error/Error500';
import ErrorMessage from '../../components/Error/ErrorMessage';

class Photos extends React.Component {
  state = {
    loading: false,
    notFound: false,
  };

  abortController = new AbortController();

  async componentDidMount() {
    const { match, fetchPhotos, loggedIn } = this.props;
    const page = match.params.pageNo;
    this.setState({ loading: true, notFound: false });
    if (page > 0) {
      const isAborted = await fetchPhotos({ page, loggedIn, signal: this.abortController.signal });
      if (isAborted === true) return;
    } else this.setState({ notFound: true, loading: false });
    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps) {
    const { match, fetchPhotos, loggedIn } = this.props;
    const page = match.params.pageNo;
    if (prevProps.match.params.pageNo !== page) {
      this.setState({ loading: true, notFound: false });
      if (page > 0) {
        const isAborted = await fetchPhotos({ page, loggedIn, signal: this.abortController.signal });
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
    const { photos, match } = this.props;

    if (loading) return <PhotoLoadingAnimation />;

    if (photos.error && photos.error.status === 500) return <Error500 />;

    if (notFound) return <Error404 />;

    return (
      <div className="photos-page page">
        <Helmet>
          <title>Photos | PentasticMe</title>
        </Helmet>
        <h1 className="photos-heading pt-3 pb-2">
          <div className="header-div">Photos</div>
        </h1>
        {photos.error ? <ErrorMessage message={photos.error.message} /> : null}
        <PhotosList photos={photos.data} />
        <Pagination pages={photos.pages} currentpage={match.params.pageNo} isStoryPage={false} />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, photos }) => ({
  loggedIn: auth.loggedIn,
  photos,
});

const mapDispatchToProps = dispatch => ({
  fetchPhotos: payload => dispatch(Actions.fetchPhotos(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Photos);
