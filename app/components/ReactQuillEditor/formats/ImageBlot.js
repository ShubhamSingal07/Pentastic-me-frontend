import { Quill } from 'react-quill';

import loading from '../../../../public/icons/loading.svg';
import * as Actions from '../../../actions';

const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    if (typeof value === 'string') {
      const file = this.dataURLtoFile(value);
      Actions.uploadImageBase64(file).then(data => {
        node.setAttribute('src', data.image);
        return node;
      });
      node.setAttribute('src', loading);
      return node;
    } else {
      node.setAttribute('src', value.url);
      return node;
    }
  }

  static value(node) {
    return {
      url: node.getAttribute('src'),
    };
  }

  static dataURLtoFile(dataurl) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'editor', { type: mime });
  }
}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';

export default ImageBlot;
