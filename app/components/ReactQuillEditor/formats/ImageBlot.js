import { Quill } from 'react-quill';

import loading from '../../../../public/images/830.svg';
import * as Actions from '../../../actions';

const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    if (typeof value === 'string') {
      const file = this.dataURLtoFile(value);
      Actions.uploadImageBase64(file).then(data => {
        node.setAttribute('src', data.image[0].url);
        node.setAttribute('height', 'auto');
        return node;
      });
      node.setAttribute('src', loading);
      node.setAttribute('width', '100%');
      node.setAttribute('height', '200px');
      return node;
    }
    node.setAttribute('src', value.url);
    return node;
  }

  static value(node) {
    return {
      url: node.getAttribute('src'),
    };
  }

  static dataURLtoFile(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'editor', { type: mime });
  }
}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';

export default ImageBlot;
