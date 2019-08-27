import React from 'react';
import { Redirect } from 'react-router-dom';

import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';
import DraftSaveModal from '../../components/DraftSaveModal';
import PublishModal from '../../components/PublishModal';

class Write extends React.Component {
  state = {
    storyHtml: '',
    title: '',
    image: '',
    showDraftModal: false,
    showPublishModal: false,
    saveLoading: false,
    publishLoading: false,
    error: undefined,
  };

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
      return <Redirect to={`/drafts/${data.draftId}`} />;
    }
  };

  handlePublishClick = async () => {
    const { title, image, storyHtml } = this.state;
    this.setState({ showPublishModal: true, publishLoading: true, error: undefined });
    const data = await Actions.publishStory(title, storyHtml, image);
    if (data.error) this.setState({ publishLoading: false, error: data.error });
    else {
      this.setState({ publishLoading: false, error: undefined });
      return <Redirect to={`/stories/${data.storyId}`} />;
    }
  };

  render() {
    const { storyHtml, showDraftModal, showPublishModal, error } = this.state;

    if (error) return <div>{error}</div>;

    return (
      <div>
        <div>
          <button onClick={this.showDraftModal}>Save</button>
          <button onClick={this.showPublishModal}>Publish</button>
          {showDraftModal ? (
            <DraftSaveModal
              titleChange={this.handleTitleChange}
              hideModal={this.hideDraftModal}
              handleClick={this.handleSaveClick}
            />
          ) : null}
          <PublishModal
            titleChange={this.handleTitleChange}
            imageChange={this.handleImageChange}
            show={showPublishModal}
            onHide={this.hidePublishModal}
            handleClick={this.handlePublishClick}
          />
        </div>
        <ReactQuillEditor handleChange={this.handleStoryHtmlChange} value={storyHtml} readOnly={false} />
      </div>
    );
  }
}

export default Write;
