import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './style.scss';

import './formats';
import dividerIcon from './icons/divider.svg';
import * as Actions from '../../actions';
import DraftSaveModal from '../DraftSaveModal';
import PublishModal from '../PublishModal';
import editIcon from '../../../public/icons/edit.svg';
import ErrorMessage from '../Error/ErrorMessage';

class Editor extends React.PureComponent {
  state = {
    draftTitle: '',
    storyTitle: '',
    description: '',
    editorHtml: '',
    readOnly: false,
    readOnlyClassName: '',
    showDraftModal: false,
    showPublishModal: false,
    saveLoading: false,
    showSave: false,
    publishLoading: false,
    error: undefined,
  };

  componentDidMount() {
    const { value, storyPage, aboutPage, contactPage, draftTitle, storyTitle, storyDescription } = this.props;
    this.editor.focus();
    this.registerFormats();
    this.setState({
      editorHtml: value,
      draftTitle,
      storyTitle,
      description: storyDescription,
    });
    if (storyPage || aboutPage || contactPage) {
      this.setState({ readOnly: true, readOnlyClassName: 'readOnly' });
    }
  }

  componentDidUpdate() {
    this.registerFormats();
  }

  insertDivider = () => {
    const range = this.quillRef.getSelection(true);
    this.quillRef.insertText(range.index, '\n', Quill.sources.USER);
    this.quillRef.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
    this.quillRef.setSelection(range.index + 2, Quill.sources.SILENT);
  };

  handleHtmlChange = html => {
    this.setState({
      editorHtml: html,
    });
  };

  handleEditClick = () => {
    this.setState({ showSave: true, readOnly: false, readOnlyClassName: '' });
  };

  handleSaveClick = async () => {
    const { draftTitle, editorHtml } = this.state;
    const { writePage, draftPage, draftId, aboutPage, contactPage } = this.props;

    if ((writePage || draftPage) && !draftTitle) return;
    this.setState({ showDraftModal: false, saveLoading: true, error: undefined });
    let data;
    if (aboutPage) data = await Actions.addAbout(editorHtml);
    else if (contactPage) data = await Actions.addContact(editorHtml);
    else if (writePage) data = await Actions.addDraft(draftTitle, editorHtml);
    else if (draftPage) data = await Actions.addDraft(draftTitle, editorHtml, draftId);
    if (data.error) this.setState({ saveLoading: false, error: data.error });
    else {
      if (aboutPage || contactPage) {
        this.setState({ readOnly: true, showSave: false, readOnlyClassName: 'readOnly' });
      } else {
        this.setState({ saveLoading: false, error: undefined });
        if (writePage) this.props.history.push(`/drafts/${data.draftId}`);
      }
    }
  };

  handlePublishClick = async () => {
    const { storyTitle, editorHtml, description } = this.state;
    const { storyPage, writePage, draftPage, storyId, draftId, images } = this.props;

    if (!images.data[0] || !storyTitle) return;
    this.setState({ showPublishModal: false, publishLoading: true, error: undefined });
    let data;
    if (writePage)
      data = await Actions.publishStory(storyTitle, editorHtml, images.data[images.data.length - 1].url, description);
    else if (draftPage)
      data = await Actions.publishDraft(
        draftId,
        storyTitle,
        editorHtml,
        images.data[images.data.length - 1].url,
        description,
      );
    else
      data = await Actions.editStory(
        storyId,
        storyTitle,
        editorHtml,
        images.data[images.data.length - 1].url,
        description,
      );
    if (data.error) this.setState({ publishLoading: false, error: data.error });
    else {
      if (storyPage)
        this.setState({ publishLoading: false, readOnly: true, showSave: false, readOnlyClassName: 'readOnly' });
      else {
        this.setState({ publishLoading: false, error: undefined });
        this.props.history.push(`/stories/${data.storyId}`);
      }
    }
  };

  handleDraftTitleChange = e => {
    this.setState({ draftTitle: e.target.value });
  };

  handleStoryTitleChange = e => {
    this.setState({ storyTitle: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
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

  registerFormats() {
    if (typeof this.editor.getEditor !== 'function') return;
    if (this.quillRef != null) return;
    const quillRef = this.editor.getEditor();
    if (quillRef != null) this.quillRef = quillRef;
  }

  render() {
    const {
      editorHtml,
      readOnlyClassName,
      showDraftModal,
      showPublishModal,
      readOnly,
      error,
      draftTitle,
      storyTitle,
      description,
      showSave,
    } = this.state;
    const { storyPage, writePage, draftPage, role, aboutPage, contactPage } = this.props;

    return (
      <div>
        <div>
          <DraftSaveModal
            titleChange={this.handleDraftTitleChange}
            show={showDraftModal}
            onHide={this.hideDraftModal}
            page={aboutPage || contactPage}
            handleClick={this.handleSaveClick}
            title={draftTitle}
          />
          <PublishModal
            titleChange={this.handleStoryTitleChange}
            descriptionChange={this.handleDescriptionChange}
            show={showPublishModal}
            onHide={this.hidePublishModal}
            handleClick={this.handlePublishClick}
            title={storyTitle}
            description={description}
          />
        </div>
        <div id="toolbar" className={`ql-toolbar ql-snow ${readOnlyClassName}`}>
          <span className="ql-formats">
            <button className="ql-header" value="1" />
            <button className="ql-header" value="2" />
          </span>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="ql-formats">
            <button className="ql-blockquote" />
            <button className="ql-code-block" />
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
          </span>
          <span className="ql-formats">
            <button className="ql-script" value="sub" />
            <button className="ql-script" value="super" />
          </span>
          <span className="ql-formats">
            <select className="ql-size" />
          </span>
          <span className="ql-formats">
            <select className="ql-color" />
          </span>
          <span className="ql-formats">
            <select className="ql-background" />
          </span>
          <span className="ql-formats">
            <select className="ql-font" defaultValue="sans-serif">
              <option value="sans-serif">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
              <option value="merriweather">Merriweather</option>
              <option value="aref-ruqaa">Aref Ruqaa</option>
            </select>
          </span>
          <span className="ql-formats">
            <select className="ql-align" />
          </span>
          <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
          </span>
          <span className="ql-formats">
            <button className="ql-clean" />
          </span>
          <span className="ql-formats">
            <button className="ql-divider">
              <img src={dividerIcon} alt="divider" />
            </button>
          </span>
        </div>

        {error ? <ErrorMessage message={error} /> : null}

        <div className="all-btns mb-3 mt-2 text-right">
          {(writePage || draftPage) && role === 'Admin' ? (
            <div>
              <button className="btn btn-outline-success btn-dark-green mr-2" onClick={this.showDraftModal}>
                Save
              </button>
              <button className="btn btn-outline-primary btn-blue-grey mr-2" onClick={this.showPublishModal}>
                Publish
              </button>
            </div>
          ) : null}
          {(storyPage || aboutPage || contactPage) && role === 'Admin' && !showSave ? (
            <button className="btn p-2 border border-primary mr-2" onClick={this.handleEditClick}>
              <img src={editIcon} />
            </button>
          ) : null}
          {(storyPage || aboutPage || contactPage) && showSave ? (
            <button
              className="btn btn-outline-success btn-dark-green mr-2"
              onClick={storyPage ? this.showPublishModal : this.handleSaveClick}>
              Save
            </button>
          ) : null}
        </div>

        <ReactQuill
          ref={editor => {
            this.editor = editor;
          }}
          value={editorHtml}
          onChange={this.handleHtmlChange}
          theme="snow"
          readOnly={readOnly}
          className={`${readOnlyClassName}`}
          placeholder="Tell your Story..."
          modules={{
            toolbar: {
              container: '#toolbar',
              handlers: {
                divider: this.insertDivider,
              },
            },
            clipboard: {
              matchVisual: true,
            },
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user, images }) => ({
  role: user.data.role,
  images,
});

export default withRouter(connect(mapStateToProps)(Editor));
