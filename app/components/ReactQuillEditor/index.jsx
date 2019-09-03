import React from 'react';
import ReactQuill, { Quill } from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './style.scss';

import './formats';
import dividerIcon from './icons/divider.svg';

class Editor extends React.PureComponent {
  state = {
    // editorHtml: '',
    readOnlyClassName: '',
  };

  componentDidMount() {
    const { readOnly } = this.props;
    this.editor.focus();
    this.registerFormats();
    this.countWords();

    // if (readOnly) {
    //   this.setState({ readOnlyClassName: 'readOnly' });
    // } else {
    //   this.setState({ readOnlyClassName: '' });
    // }
    console.log('in react quill editor component did mount', readOnly);
    if (readOnly) this.readOnlyClassName = 'readOnly';
    else this.readOnlyClassName = '';
    console.log(this.readOnlyClassName);
  }

  componentDidUpdate() {
    const { readOnly } = this.props;
    this.registerFormats();
    this.countWords();

    // if (readOnly) {
    //   this.setState({ readOnlyClassName: 'readOnly' });
    // } else {
    //   this.setState({ readOnlyClassName: '' });
    // }
    if (readOnly) this.readOnlyClassName = 'readOnly';
    else this.readOnlyClassName = '';
  }

  insertDivider = () => {
    const range = this.quillRef.getSelection(true);
    this.quillRef.insertText(range.index, '\n', Quill.sources.USER);
    this.quillRef.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
    this.quillRef.setSelection(range.index + 2, Quill.sources.SILENT);
  };

  // handleHtmlChange = html => {
  //   this.setState({
  //     editorHtml: html,
  //   });
  // };

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
    // this.setState({
    //   countOfWords: `${length} ${label}`,
    // });
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

  render() {
    const { editorHtml, readOnlyClassName } = this.state;
    const { readOnly, handleChange, value, children } = this.props;
    console.log('in read only ', readOnly, this.readOnlyClassName);
    return (
      <div>
        <div id="toolbar" className={`ql-toolbar ql-snow ${this.readOnlyClassName}`}>
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

        {children || null}

        <ReactQuill
          ref={editor => {
            this.editor = editor;
          }}
          value={value}
          onChange={handleChange}
          theme="snow"
          readOnly={readOnly}
          className={`${this.readOnlyClassName}`}
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
