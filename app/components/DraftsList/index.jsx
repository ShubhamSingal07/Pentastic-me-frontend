import React from 'react';
import { Link } from 'react-router-dom';

import DraftItem from './DraftItem';

const DraftsList = ({ drafts }) => (
  <div>
    {drafts.length > 0 ? (
      drafts.map(draft => <DraftItem draft={draft} key={draft._id} />)
    ) : (
      <div>
        No more drafts.
        <Link to="/stories/write">Write a story now</Link>
      </div>
    )}
  </div>
);

export default DraftsList;
