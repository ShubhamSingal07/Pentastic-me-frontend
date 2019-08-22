import React from 'react';
import { connect } from 'react-redux';

import * as Actions from '../../actions';
import PhotosList from '../../components/PhotosList';

class Photos extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    const { match, fetchPhotos } = this.props;
    const page = match.props.pageNo;
    this.setState({ loading: true });
    fetchPhotos({ page, loggedIn });
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { photos } = this.props;

    if (loading) return <div>Loading</div>;

    if (photos.error) return <div>{photos.error}</div>;

    return (
      <div>
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
  fetchPhotos: dispatch(Actions.fetchPhotos),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Photos);
