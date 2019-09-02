import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './style.scss';
import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';
import PublishModal from '../../components/PublishModal';

class Story extends React.Component {
  state = {
    title: '',
    image: '',
    storyHtml: '',
    loading: false,
    clapLoading: false,
    bookmarkLoading: false,
    readOnly: true,
    publishLoading: false,
    showSave: false,
    showPublishModal: false,
    error: undefined,
  };

  async componentDidMount() {
    const { match, fetchStory, loggedIn, story } = this.props;
    const storyId = match.params.storyId;
    this.setState({ loading: true });
    const body = await fetchStory({ storyId, loggedIn });
    this.setState({ loading: false, storyHtml: body });
  }

  hidePublishModal = () => {
    this.setState({ showPublishModal: false });
  };

  handleClapStory = () => {
    const { clapStory, loggedIn, story } = this.props;
    if (!loggedIn) return <Redirect to="http://localhost:3000/auth/login" />;
    this.setState({ clapLoading: true });
    clapStory({ storyId: story.data._id });
    this.setState({ clapLoading: false });
  };

  handleUnclapStory = () => {
    const { unclapStory, story, loggedIn } = this.props;
    if (!loggedIn) return <Redirect to="http://localhost:3000/auth/login" />;
    this.setState({ clapLoading: true });
    unclapStory({ storyId: story.data._id });
    this.setState({ clapLoading: false });
  };

  handleAddBookmarkStory = () => {
    const { addToBookmark, loggedIn, story } = this.props;
    if (!loggedIn) return <Redirect to="http://localhost:3000/auth/login" />;
    this.setState({ bookmarkLoading: true });
    addToBookmark({ storyId: story.data._id });
    this.setState({ bookmarkLoading: false });
  };

  handleRemoveBookmarkStory = () => {
    const { deleteBookmark, loggedIn, story } = this.props;
    if (!loggedIn) return <Redirect to="http://localhost:3000/auth/login" />;
    this.setState({ bookmarkLoading: true });
    deleteBookmark({ storyId: story.data._id });
    this.setState({ bookmarkLoading: false });
  };

  handleStoryHtmlChange = html => {
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

  handleEditStoryClick = async () => {
    const { title, storyHtml, image } = this.state;
    const { story } = this.props;
    this.setState({ publishLoading: true, showPublishModal: false });
    const data = await Actions.editStory(story.data._id, title, storyHtml, image);
    if (data.error) this.setState({ publishLoading: false, readOnly: false, error: data.error });
    else this.setState({ publishLoading: false, readOnly: true, showSave: false });
  };

  render() {
    const {
      loading,
      clapLoading,
      bookmarkLoading,
      storyHtml,
      showSave,
      publishLoading,
      showPublishModal,
      title,
      readOnly,
    } = this.state;
    const { story, role } = this.props;
    if (loading) return <div>Loading</div>;

    if (story.error) return <div>{story.error}</div>;

    return (
      <div className="story-page">
        {role === 'Admin' && !showSave ? <button onClick={this.handleEditClick}>Edit</button> : null}
        {showSave ? <button onClick={this.handleSaveClick}>Save</button> : null}
        <PublishModal
          titleChange={this.handleTitleChange}
          imageChange={this.handleImageChange}
          show={showPublishModal}
          handleClick={this.handleEditStoryClick}
          onHide={this.hidePublishModal}
          title={title}
        />
        <ReactQuillEditor handleChange={this.handleStoryHtmlChange} value={storyHtml} readOnly={readOnly} />
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

const mapStateToProps = ({ story, auth, user }) => ({
  loggedIn: auth.loggedIn,
  story,
  role: user.data.role,
  user,
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
