import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as Actions from '../../actions';
import PublishModal from '../../components/PublishModal';
import DraftSaveModal from '../../components/DraftSaveModal';
import ReactQuillEditor from '../../components/ReactQuillEditor';
import { async } from 'q';

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

  handleDraftHtmlChange = html => {
    this.setState({
      draftHtml: html,
    });
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleImageChange = data => {
    this.setState({ image: data });
  };

  handleSaveClick = async () => {
    const { title, draftHtml } = this.state;
    const { draft } = this.props;
    this.setState({ saveLoading: true, error: undefined, showDraftModal: false });
    const data = await Actions.addDraft(title, draftHtml, draft.id);
    if (data.error) this.setState({ saveLoading: false, error: data.error });
    else this.setState({ saveLoading: false, error: undefined });
  };

  handlePublishClick = async () => {
    const { title, draftHtml, image } = this.state;
    const { draft } = this.props;
    this.setState({ publishloading: true, error: undefined, showPublishModal: false });
    const data = await Actions.publishDraft(draft.id, title, draftHtml, image);
    if (data.error) this.setState({ publishloading: false, error: data.error });
    else {
      this.setState({ publishLoading: false, error: undefined });
      return <Redirect to={`/stories/${data.storyId}`} />;
    }
  };

  render() {
    const { draftHtml, loading, error, showDraftModal, showPublishModal } = this.state;
    const { draft } = this.props;

    if (loading) return <div>Loading</div>;

    if (draft.error) return <div>{draft.error}</div>;

    if (error) return <div>{error}</div>;

    return (
      <div>
        <div>
          <button onClick={this.showDraftModal}>Save</button>
          <button onClick={this.showPublishModal}>Publish</button>
        </div>
        {showDraftModal ? (
          <DraftSaveModal
            titleChange={this.handleTitleChange}
            handleClick={this.handleSaveClick}
            hideModal={this.hideDraftModal}
          />
        ) : null}
        {showPublishModal ? (
          <PublishModal
            titleChange={this.handleTitleChange}
            imageChange={this.handleImageChange}
            handleClick={this.handlePublishClick}
            hideModal={this.hidePublishModal}
          />
        ) : null}
        <ReactQuillEditor readOnly={false} value={draftHtml} handleChange={this.handleDraftHtmlChange} />
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
