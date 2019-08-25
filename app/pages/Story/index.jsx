import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as Actions from '../../actions';
import { clapStory } from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';
import PublishModal from '../../components/PublishModal';

class Story extends React.Component {
  state = {
    storyHtml: '',
    clapLoading: false,
    bookmarkLoading: false,
    readOnly: true,
    publishLoading: false,
    showSave: false,
    showPublishModal: false,
  };

  componentDidMount() {
    const { match, fetchStory, loggedIn, story } = this.props;
    const storyId = match.params.storyId;
    this.setState({ loading: true });
    fetchStory({ storyId, loggedIn });
    this.setState({ loading: false, storyHtml: story.data.body });
  }

  async handlePublishClick() {
    const { title, storyHtml, image } = this.state;
    this.setState({ publishLoading: true });
    await Actions.publishStory(title, storyHtml, image);
    this.setState({ publishLoading: false, readOnly: true, showSave: false, showPublishModal: false });
  }

  hidePublishModal() {
    this.setState({ showPublishModal: false });
  }

  render() {
    const { clapLoading, bookmarkLoading, storyHtml, showSave, publishLoading } = this.state;
    const { story, loggedIn, role, clapStory, unclapStory, addToBookmark, deleteBookmark } = this.props;

    const handleClapStory = () => {
      if (!loggedIn) return <Redirect to="http://localhost:3000/auth/login" />;
      this.setState({ clapLoading: true });
      clapStory({ storyId: story.id });
      this.setState({ clapLoading: false });
    };

    const handleUnclapStory = () => {
      if (!loggedIn) return <Redirect to="http://localhost:3000/auth/login" />;
      this.setState({ clapLoading: true });
      unclapStory({ storyId: story.id });
      this.setState({ clapLoading: false });
    };

    const handleAddBookmarkStory = () => {
      if (!loggedIn) return <Redirect to="http://localhost:3000/auth/login" />;
      this.setState({ bookmarkLoading: true });
      addToBookmark({ storyId: story.id });
      this.setState({ bookmarkLoading: false });
    };

    const handleRemoveBookmarkStory = () => {
      if (!loggedIn) return <Redirect to="http://localhost:3000/auth/login" />;
      this.setState({ bookmarkLoading: true });
      deleteBookmark({ storyId: story.id });
      this.setState({ bookmarkLoading: false });
    };

    const handleStoryChange = html => {
      this.setState({
        storyHtml: html,
      });
    };

    const handleEditClick = () => {
      this.setState({ showSave: true, readOnly: false });
    };

    const handleSaveClick = () => {
      this.setState({ showPublishModal: true });
    };

    const handleTitleChange = e => {
      this.setState({
        title: e.target.value,
      });
    };

    const handleImageChange = e => {
      this.setState({
        image: e.target.value,
      });
    };

    if (loading) return <div>Loading</div>;

    if (story.error) return <div>{story.error}</div>;

    return (
      <div>
        {role === 'Admin' && !showSave ? <button onClick={handleEditClick}>Edit</button> : null}
        {showSave ? <button onClick={handleSaveClick}>Save</button> : null}
        {showPublishModal ? (
          <PublishModal
            titleChange={handleTitleChange}
            imageChange={handleImageChange}
            handleClick={this.handlePublishClick}
            hideModal={this.hidePublishModal}
          />
        ) : null}
        <ReactQuillEditor value={storyHtml} handleChange={handleStoryChange} readOnly={readOnly} />
        <div>
          {story.data.isLiked ? (
            <span onClick={handleUnclapStory}>Unclap</span>
          ) : (
            <span onClick={handleClapStory}>Clap</span>
          )}
          {story.data.isBookmarked ? (
            <span onClick={handleRemoveBookmarkStory}>Unbookmark</span>
          ) : (
            <span onClick={handleAddBookmarkStory}>Bookmark</span>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ story, auth, user }) => ({
  loggedIn: auth.loggedIn,
  story,
  role: user.data.role,
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
