import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import './style.scss';

import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';
import ClapHandsIcon from '../../components/ClapHands';
import BookmarkIcon from '../../components/BookmarkIcon';
import Error500 from '../../components/Error/Error500';
import ErrorMessage from '../../components/Error/ErrorMessage';

const OAUTH_URL = process.env.OAUTH_URL;

class Story extends React.Component {
  state = {
    loading: false,
    clapLoading: false,
    bookmarkLoading: false,
    storyHtml: '',
    title: '',
    description: '',
  };

  abortController = new AbortController();

  async componentDidMount() {
    const { match, fetchStory, loggedIn } = this.props;
    const storyId = match.params.storyId;
    this.setState({ loading: true });
    const data = await fetchStory({ storyId, loggedIn, signal: this.abortController.signal });
    if (data === true) return;
    this.setState({ loading: false, storyHtml: data.body, title: data.title, description: data.description });
  }

  componentWillUnmount() {
    this.abortController.abort();
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
    const { loading, clapLoading, bookmarkLoading, storyHtml, title, description } = this.state;
    const { story, match } = this.props;

    if (loading) return <div />;

    if (story.error && story.error.status === 500) return <Error500 />;

    return (
      <div className="story-page page">
        <Helmet>
          <title>{title} | PentasticMe</title>
        </Helmet>
        {story.error ? <ErrorMessage message={story.error.message} /> : null}
        <div className=" d-flex flex-column flex-lg-row-reverse justify-content-end">
          {/* <div class="sharethis-inline-share-buttons" /> */}
          <div className="editor-container">
            <ReactQuillEditor
              value={storyHtml}
              storyPage={true}
              storyId={match.params.storyId}
              storyTitle={title}
              storyDescription={description}
            />
          </div>

          <div className="btn-container position-sticky">
            <div className="btn-con d-inline-block text-left">
              <div className="clapHandsBtn">
                <button
                  className={`border rounded-circle p-1 click-btn ${
                    story.data.isLiked ? 'border-primary' : 'border-grey'
                  }`}
                  onClick={story.data.isLiked ? this.handleUnclapStory : this.handleClapStory}>
                  <ClapHandsIcon isLiked={story.data.isLiked} />
                </button>
                <span style={story.data.isLiked ? { color: '#007bff' } : { color: 'grey' }}>
                  {' '}
                  {story.data.claps > 0 ? story.data.claps : null}
                </span>
              </div>
              <div className="bookmarkBtn mt-3">
                <button
                  className="click-btn mx-auto p-1"
                  onClick={story.data.isBookmarked ? this.handleRemoveBookmarkStory : this.handleAddBookmarkStory}>
                  <BookmarkIcon isBookmarked={story.data.isBookmarked} />
                </button>
              </div>
            </div>
          </div>
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
