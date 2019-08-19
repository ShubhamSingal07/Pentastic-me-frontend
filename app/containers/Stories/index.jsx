import React from 'react';

import Navbar from '../../components/Navbar';
import ReactQuillEditor from '../../components/ReactQuillEditor';

const Stories = () => (
  <div>
    <Navbar />
    <div className="editor-block">
      <ReactQuillEditor readOnly={false} />
    </div>
  </div>
);

export default Stories;
