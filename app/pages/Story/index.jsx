import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as Actions from '../../actions';
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
    error: undefined,
  };

  componentDidMount() {
    const { match, fetchStory, loggedIn, story } = this.props;
    const storyId = match.params.storyId;
    this.setState({ loading: true });
    fetchStory({ storyId, loggedIn });
    this.setState({ loading: false, storyHtml: story.data.body });
  }

  hidePublishModal = () => {
    this.setState({ showPublishModal: false });
  };

  handleClapStory = () => {
    const { clapStory } = this.props;
    if (!loggedIn) return <Redirect to="http://localhost:3000/auth/login" />;
    this.setState({ clapLoading: true });
    clapStory({ storyId: story.id });
    this.setState({ clapLoading: false });
  };

  handleUnclapStory = () => {
    const { unclapStory } = this.props;
    if (!loggedIn) return <Redirect to="http://localhost:3000/auth/login" />;
    this.setState({ clapLoading: true });
    unclapStory({ storyId: story.id });
    this.setState({ clapLoading: false });
  };

  handleAddBookmarkStory = () => {
    const { addToBookmark } = this.props;
    if (!loggedIn) return <Redirect to="http://localhost:3000/auth/login" />;
    this.setState({ bookmarkLoading: true });
    addToBookmark({ storyId: story.id });
    this.setState({ bookmarkLoading: false });
  };

  handleRemoveBookmarkStory = () => {
    const { deleteBookmark, loggedIn } = this.props;
    if (!loggedIn) return <Redirect to="http://localhost:3000/auth/login" />;
    this.setState({ bookmarkLoading: true });
    deleteBookmark({ storyId: story.id });
    this.setState({ bookmarkLoading: false });
  };

  handleStoryChange = html => {
    this.setState({ storyHtml: html });
  };

  handleEditClick = () => {
    this.setState({ showSave: true, readOnly: false });
  };

  handleSaveClick = () => {
    this.setState({ showPublishModal: true });
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleImageChange = image => {
    this.setState({ image });
  };

  handlePublishClick = async () => {
    const { title, storyHtml, image } = this.state;
    this.setState({ publishLoading: true, showPublishModal: false });
    const data = await Actions.publishStory(title, storyHtml, image);
    if (data.error) this.setState({ publishLoading: false, readOnly: false, error: data.error });
    else this.setState({ publishLoading: false, readOnly: true, showSave: false });
  };

  render() {
    const { clapLoading, bookmarkLoading, storyHtml, showSave, publishLoading } = this.state;
    const { story, role } = this.props;

    if (loading) return <div>Loading</div>;

    if (story.error) return <div>{story.error}</div>;

    return (
      <div>
        {role === 'Admin' && !showSave ? <button onClick={this.handleEditClick}>Edit</button> : null}
        {showSave ? <button onClick={this.handleSaveClick}>Save</button> : null}
        {showPublishModal ? (
          <PublishModal
            titleChange={this.handleTitleChange}
            imageChange={this.handleImageChange}
            handleClick={this.handlePublishClick}
            hideModal={this.hidePublishModal}
          />
        ) : null}
        <ReactQuillEditor value={storyHtml} handleChange={this.handleStoryChange} readOnly={readOnly} />
        <div>
          {story.data.isLiked ? (
            <span onClick={this.handleUnclapStory}>Unclap</span>
          ) : (
            <span onClick={this.handleClapStory}>Clap</span>
          )}
          {story.data.isBookmarked ? (
            <span onClick={this.handleRemoveBookmarkStory}>Unbookmark</span>
          ) : (
            <span onClick={this.handleAddBookmarkStory}>Bookmark</span>
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
