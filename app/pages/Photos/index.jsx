import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import * as Actions from '../../actions';
import PhotosList from '../../components/PhotosList';

class Photos extends React.Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    const { match, fetchPhotos, loggedIn } = this.props;
    const page = match.params.pageNo;
    this.setState({ loading: true });
    await fetchPhotos({ page, loggedIn });
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { photos } = this.props;

    if (loading) return <div className="photos-page">Loading</div>;

    if (photos.error) return <div className="photos-page">{photos.error}</div>;

    return (
      <div className="photos-page">
        <PhotosList photos={photos.data} />
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
