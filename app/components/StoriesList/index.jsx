import React from 'react';

import StoryItem from './StoryItem';

const StoriesList = ({ stories }) => {
  return (
    <div>
      <h1>Stories</h1>
      {stories.length === 0 ? (
        <div>There is no story by Author yet</div>
      ) : (
        stories.map(story => <StoryItem story={story} key={story.id} />)
      )}
    </div>
  );
};

export default StoriesList;
