import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as Actions from '../../actions';
import PublishModal from '../../components/PublishModal';
import DraftSaveModal from '../../components/DraftSaveModal';
import ReactQuillEditor from '../../components/ReactQuillEditor';

class Draft extends React.Component {
  state = {
    loading: false,
    saveLoading: false,
    publishloading: false,
    draftHtml: '',
    title: '',
    image: '',
    error: undefined,
    showPublishModal: false,
    showDraftModal: false,
  };

  componentDidMount() {
    const { match, fetchDraft, draft } = this.props;
    const draftId = match.params.draftId;
    this.setState({ loading: true });
    fetchDraft({ draftId });
    this.setState({ loading: false, draftHtml: draft.data.body });
  }

  async handleSaveCLick() {
    const { title, draftHtml } = this.state;
    const { draft } = this.props;
    this.setState({ saveLoading: true, error: undefined });
    const data = await Actions.addDraft(title, draftHtml, draft.id);
    if (data.error) this.setState({ saveLoading: false, error: data.error, showDraftModal: false });
    else this.setState({ saveLoading: false, error: undefined, showDraftModal: false });
  }

  async handlePublishClick() {
    const { title, draftHtml, image } = this.state;
    const { draft } = this.props;
    this.setState({ publishloading: true, error: undefined });
    const data = await Actions.publishDraft(draft.id, title, draftHtml, image);
    if (data.error) this.setState({ publishloading: false, error: data.error, showPublishModal: false });
    else {
      this.setState({ publishLoading: false, error: undefined, showPublishModal: false });
      return <Redirect to={`/stories/${data.storyId}`} />;
    }
  }

  showDraftModal() {
    this.setState({ showDraftModal: true });
  }

  hideDraftModal() {
    this.setState({ showDraftModal: false });
  }

  showPublishModal() {
    this.setState({ showPublishModal: true });
  }

  hidePublishModal() {
    this.setState({ showPublishModal: false });
  }

  render() {
    const { draftHtml, loading, error, showDraftModal, showPublishModal } = this.state;
    const { draft } = this.props;

    const handleDraftHtmlChange = html => {
      this.setState({
        draftHtml: html,
      });
    };

    const handleTitleChange = e => {
      this.setState({ title: e.target.value });
    };

    const handleImageChange = e => {
      this.setState({ image: e.target.value });
    };

    if (loading) return <div>Loading</div>;

    if (draft.error) return <div>{draft.error}</div>;

    if (error) return <div>{error}</div>;

    return (
      <div>
        <div>
          <button onClick={this.showDraftModal}>Save</button>
          <button onClick={this.showPublishModal}>Publish</button>
        </div>
        {showDraftModal ? <DraftSaveModal handleClick={this.handleSaveCLick} hideModal={this.hideDraftModal} /> : null}
        {showPublishModal ? (
          <PublishModal
            titleChange={handleTitleChange}
            imageChange={handleImageChange}
            handleClick={this.handlePublishClick}
            hideModal={this.hidePublishModal}
          />
        ) : null}
        <ReactQuillEditor readOnly={false} value={draftHtml} handleChange={handleDraftHtmlChange} />
      </div>
    );
  }
}

const mapStateToProps = ({ draft }) => ({
  draft,
});

const mapDispatchToProps = dispatch => ({
  fetchDraft: payload => dispatch(Actions.fetchDraft(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Draft);
