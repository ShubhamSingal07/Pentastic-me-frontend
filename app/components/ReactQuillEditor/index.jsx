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

const Delta = Quill.import('delta');

class Editor extends React.PureComponent {
  state = {
    title: '',
    image: '',
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
    const { readOnly } = this.state;
    const { value, storyPage } = this.props;
    this.editor.focus();
    this.registerFormats();
    // if (!readOnly) this.countWords();
    this.setState({
      editorHtml: value,
    });
    if (storyPage) {
      this.setState({ readOnly: true, readOnlyClassName: 'readOnly' });
    }
  }

  componentDidUpdate() {
    const { readOnly } = this.state;
    this.registerFormats();
    // if (!readOnly) this.countWords();
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

  registerFormats() {
    if (typeof this.editor.getEditor !== 'function') return;
    if (this.quillRef != null) return;
    const quillRef = this.editor.getEditor();
    if (quillRef != null) {
      this.quillRef = quillRef;
    }
  }

  // countWords() {
  //   this.quillRef.on('text-change', this.update.bind(this));
  //   this.unit = 'word';
  //   this.update();
  // }

  // update() {
  //   const length = this.calculate();
  //   let label = this.unit;
  //   if (length !== 1) {
  //     label += 's';
  //   }
  //   this.countOfWords = `${length} ${label}`;
  // }

  // calculate() {
  //   let text = this.quillRef.getText();
  //   if (this.unit === 'word') {
  //     text = text.trim();
  //     return text.length > 0 ? text.split(/\s+/).length : 0;
  //   }
  //   return text.length;
  // }

  handleEditClick = () => {
    this.setState({ showSave: true, readOnly: false, readOnlyClassName: '' });
  };

  handleSaveClick = async () => {
    const { title, editorHtml } = this.state;
    const { writePage, draftPage, draftId } = this.props;
    this.setState({ showDraftModal: false, saveLoading: true, error: undefined });
    let data;
    if (writePage) data = await Actions.addDraft(title, editorHtml);
    else if (draftPage) data = await Actions.addDraft(title, editorHtml, draftId);
    if (data.error) this.setState({ saveLoading: false, error: data.error });
    else {
      this.setState({ saveLoading: false, error: undefined });
      if (writePage) this.props.history.push(`/drafts/${data.draftId}`);
    }
  };

  handlePublishClick = async () => {
    const { title, image, editorHtml } = this.state;
    const { storyPage, writePage, draftPage, storyId, draftId } = this.props;
    this.setState({ showPublishModal: false, publishLoading: true, error: undefined });
    let data;
    if (writePage) data = await Actions.publishStory(title, editorHtml, image);
    else if (draftPage) data = await Actions.publishDraft(draftId, title, editorHtml, image);
    else data = await Actions.editStory(storyId, title, editorHtml, image);
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

  render() {
    const {
      editorHtml,
      readOnlyClassName,
      showDraftModal,
      showPublishModal,
      readOnly,
      error,
      title,
      image,
      showSave,
    } = this.state;
    const { storyPage, role } = this.props;

    if (error) return <div className="draft-page">{error}</div>;

    return (
      <div>
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

        <div>
          {!storyPage && role === 'Admin' ? (
            <div>
              <button onClick={this.showDraftModal}>Save</button>
              <button onClick={this.showPublishModal}>Publish</button>
            </div>
          ) : null}
          {storyPage && role === 'Admin' && !showSave ? <button onClick={this.handleEditClick}>Edit</button> : null}
          {storyPage && showSave ? <button onClick={this.showPublishModal}>Save</button> : null}
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

        {/* {!readOnly ? <div id="counter">{this.countOfWords}</div> : null} */}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  role: user.data.role,
});

export default withRouter(connect(mapStateToProps)(Editor));
