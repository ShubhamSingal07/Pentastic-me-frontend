import React from 'react';

import Navbar from '../../components/Navbar';
import ReactQuillEditor from '../../components/ReactQuillEditor';

const Drafts = () => (
  <div>
    <Navbar />
    <ReactQuillEditor readOnly={false} />
  </div>
);

export default Drafts;
