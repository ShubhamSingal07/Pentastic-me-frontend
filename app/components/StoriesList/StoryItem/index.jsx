import React from 'react';
import { Redirect } from 'react-router-dom';

const StoryItem = ({ story }) => {
  handleClick = () => {
    <Redirect to={`/stories/${story.id}`} />;
  };

  return (
    <div onClick={handleClick}>
      <img src={story.image} width="100px" height="100px" />
      <span>{story.title}</span>
    </div>
  );
};

export default StoryItem;
