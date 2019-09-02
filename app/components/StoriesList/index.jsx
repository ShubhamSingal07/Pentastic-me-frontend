import React from 'react';

import StoryItem from './StoryItem';

const StoriesList = ({ stories, bookmarkPage }) => (
  <div>
    {bookmarkPage ? null : <h1>Stories</h1>}
    {stories.length === 0 ? (
      bookmarkPage ? (
        <div>You do not have any story bookmarked</div>
      ) : (
        <div>There is no story by Author yet</div>
      )
    ) : (
      stories.map(story => <StoryItem story={story} key={story._id} bookmarkPage={bookmarkPage} />)
    )}
  </div>
);

export default StoriesList;
