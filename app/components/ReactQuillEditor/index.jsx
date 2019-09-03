import React from 'react';
import ReactQuill, { Quill } from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './style.scss';

import './formats';
import dividerIcon from './icons/divider.svg';
import * as Actions from '../../actions';
import DraftSaveModal from '../DraftSaveModal';
import PublishModal from '../PublishModal';
import { async } from 'q';

class Editor extends React.PureComponent {
  state = {
    editorHtml: '',
    readOnly: false,
    readOnlyClassName: '',
    showDraftModal: false,
    showPublishModal: false,
    saveLoading: false,
    publishLoading: false,
    error: undefined,
  };

  componentDidMount() {
    const { value, storyPage } = this.props;
    this.editor.focus();
    this.registerFormats();
    this.countWords();
    this.setState({
      editorHtml: value,
    });
    if (storyPage) {
      this.setState({ readOnly: true, readOnlyClassName: 'readOnly' });
    }
  }

  componentDidUpdate() {
    this.registerFormats();
    this.countWords();
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

  countWords() {
    this.quillRef.on('text-change', this.update.bind(this));
    this.unit = 'word';
    this.update();
  }

  update() {
    const length = this.calculate();
    let label = this.unit;
    if (length !== 1) {
      label += 's';
    }
    this.countOfWords = `${length} ${label}`;
  }

  calculate() {
    let text = this.quillRef.getText();
    if (this.unit === 'word') {
      text = text.trim();
      return text.length > 0 ? text.split(/\s+/).length : 0;
    }
    return text.length;
  }

  handleSaveClick = async () => {
    const { title, editorHtml } = this.state;
    this.setState({ showDraftModal: false, saveLoading: true, error: undefined });
    let data;
    if (writePage) data = await Actions.addDraft(title, editorHtml);
    else if (draftPage) data = await Actions.addDraft(title, draftHtml, draft.data._id);
    if (data.error) this.setState({ saveLoading: false, error: data.error });
    else {
      this.setState({ saveLoading: false, error: undefined });
      this.props.history.push(`/drafts/${data.draftId}`);
    }
  };

  handlePublishClick = async () => {
    const { title, image, editorHtml } = this.state;
    const { storyPage, draft } = this.props;
    this.setState({ showPublishModal: true, publishLoading: true, error: undefined });
    let data;
    if (storyPage) data = await Actions.publishStory(title, editorHtml, image);
    else data = await Actions.publishDraft(draft.data._id, title, editorHtml, image);
    if (data.error) this.setState({ publishLoading: false, error: data.error });
    else {
      this.setState({ publishLoading: false, error: undefined });
      this.props.history.push(`/stories/${data.storyId}`);
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
    const { editorHtml, readOnlyClassName, showDraftModal, showPublishModal, readOnly } = this.state;

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
            <select className="ql-font" defaultValue="serif">
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

        <button onClick={this.showDraftModal}>Save</button>
        <button onClick={this.showPublishModal}>Publish</button>

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

        <div id="counter">{this.countOfWords}</div>
      </div>
    );
  }
}

export default Editor;
