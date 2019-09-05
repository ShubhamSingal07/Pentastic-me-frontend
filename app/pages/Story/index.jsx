import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './style.scss';
import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';
import PublishModal from '../../components/PublishModal';

const OAUTH_URL = process.env.OAUTH_URL;

class Story extends React.Component {
  state = {
    loading: false,
    clapLoading: false,
    bookmarkLoading: false,
  };

  async componentDidMount() {
    const { match, fetchStory, loggedIn, story } = this.props;
    const storyId = match.params.storyId;
    this.setState({ loading: true });
    const body = await fetchStory({ storyId, loggedIn });
    this.setState({ loading: false, storyHtml: body });
  }

  handleClapStory = () => {
    const { clapStory, loggedIn, story } = this.props;
    if (!loggedIn) return (window.location.href = OAUTH_URL);
    this.setState({ clapLoading: true });
    clapStory({ storyId: story.data._id });
    this.setState({ clapLoading: false });
  };

  handleUnclapStory = () => {
    const { unclapStory, story, loggedIn } = this.props;
    if (!loggedIn) return (window.location.href = OAUTH_URL);
    this.setState({ clapLoading: true });
    unclapStory({ storyId: story.data._id });
    this.setState({ clapLoading: false });
  };

  handleAddBookmarkStory = () => {
    const { addToBookmark, loggedIn, story } = this.props;
    if (!loggedIn) return (window.location.href = OAUTH_URL);
    this.setState({ bookmarkLoading: true });
    addToBookmark({ storyId: story.data._id });
    this.setState({ bookmarkLoading: false });
  };

  handleRemoveBookmarkStory = () => {
    const { deleteBookmark, loggedIn, story } = this.props;
    if (!loggedIn) return (window.location.href = OAUTH_URL);
    this.setState({ bookmarkLoading: true });
    deleteBookmark({ storyId: story.data._id });
    this.setState({ bookmarkLoading: false });
  };

  render() {
    const { loading, clapLoading, bookmarkLoading, storyHtml } = this.state;
    const { story, match } = this.props;
    if (loading) return <div>Loading</div>;

    if (story.error) return <div>{story.error}</div>;

    return (
      <div className="story-page">
        <ReactQuillEditor value={storyHtml} storyPage={true} storyId={match.params.storyId} />
        <div>
          {story.data.isLiked ? (
            <button onClick={this.handleUnclapStory}>Unclap</button>
          ) : (
            <button onClick={this.handleClapStory}>Clap</button>
          )}
          {story.data.isBookmarked ? (
            <button onClick={this.handleRemoveBookmarkStory}>Unbookmark</button>
          ) : (
            <button onClick={this.handleAddBookmarkStory}>Bookmark</button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ story, auth }) => ({
  loggedIn: auth.loggedIn,
  story,
});

const mapDispatchToProps = dispatch => ({
  fetchStory: payload => dispatch(Actions.fetchStory(payload)),
  clapStory: payload => dispatch(Actions.clapStory(payload)),
  unclapStory: payload => dispatch(Actions.unclapStory(payload)),
  addToBookmark: payload => dispatch(Actions.addToBookmark(payload)),
  deleteBookmark: payload => dispatch(Actions.deleteBookmark(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Story);
