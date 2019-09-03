import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './style.scss';
import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';
import DraftSaveModal from '../../components/DraftSaveModal';
import PublishModal from '../../components/PublishModal';

class Write extends React.Component {
  state = {
    loading: false,
    storyHtml: '',
    title: '',
    image: '',
    showDraftModal: false,
    showPublishModal: false,
    saveLoading: false,
    publishLoading: false,
    error: undefined,
  };

  async componentWillMount() {
    const { refresh, loggedIn } = this.props;
    this.setState({ loading: true });
    await refresh({ loggedIn });
    this.setState({ loading: false });
  }

  handleStoryHtmlChange = html => {
    this.setState({ storyHtml: html });
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleImageChange = e => {
    this.setState({ image: e.target.value });
  };

  showDraftModal = () => {
    this.setState({ showDraftModal: true });
  };

  showPublishModal = () => {
    this.setState({ showPublishModal: true });
  };

  hideDraftModal = () => {
    this.setState({ showDraftModal: false });
  };

  hidePublishModal = () => {
    this.setState({ showPublishModal: false });
  };

  handleSaveClick = async () => {
    const { title, storyHtml } = this.state;
    this.setState({ showDraftModal: false, saveLoading: true, error: undefined });
    const data = await Actions.addDraft(title, storyHtml);
    if (data.error) this.setState({ saveLoading: false, error: data.error });
    else {
      this.setState({ saveLoading: false, error: undefined });
      this.props.history.push(`/drafts/${data.draftId}`);
    }
  };

  handlePublishClick = async () => {
    const { title, image, storyHtml } = this.state;
    this.setState({ showPublishModal: true, publishLoading: true, error: undefined });
    const data = await Actions.publishStory(title, storyHtml, image);
    if (data.error) this.setState({ publishLoading: false, error: data.error });
    else {
      this.setState({ publishLoading: false, error: undefined });
      this.props.history.push(`/stories/${data.storyId}`);
    }
  };

  render() {
    const { loading, storyHtml, showDraftModal, showPublishModal, error, title } = this.state;
    const { loggedIn, role } = this.props;

    if (loading) return <div>Loading</div>;

    if (!loggedIn) return (window.location.href = process.env.OAUTH_URL);

    if (role !== 'Admin') return <Redirect to="/" />;

    if (error) return <div className="write-page">{error}</div>;

    return (
      <div className="write-page">
        <div>
          <DraftSaveModal
            titleChange={this.handleTitleChange}
            show={showDraftModal}
            onHide={this.hideDraftModal}
            handleClick={this.handleSaveClick}
            title={title}
          />
          <PublishModal
            titleChange={this.handleTitleChange}
            imageChange={this.handleImageChange}
            show={showPublishModal}
            onHide={this.hidePublishModal}
            handleClick={this.handlePublishClick}
            title={title}
          />
        </div>
        <ReactQuillEditor handleChange={this.handleStoryHtmlChange} value={storyHtml} readOnly={false}>
          <button onClick={this.showDraftModal}>Save</button>
          <button onClick={this.showPublishModal}>Publish</button>
        </ReactQuillEditor>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  role: user.data.role,
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  refresh: payload => dispatch(Actions.refresh(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Write);
