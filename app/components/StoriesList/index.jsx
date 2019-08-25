import React from 'react';

import StoryItem from './StoryItem';

const StoriesList = ({ stories, bookmarkPage }) => {
  return (
    <div>
      <h1>Stories</h1>
      {stories.length === 0 ? (
        <div>There is no story by Author yet</div>
      ) : (
        stories.map(story => <StoryItem story={story} key={story.id} bookmarkPage={bookmarkPage} />)
      )}
    </div>
  );
};

export default StoriesList;
