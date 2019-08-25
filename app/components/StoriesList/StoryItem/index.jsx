import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as Actions from '../../../actions';

const StoryItem = ({ story, deleteBookmarks, bookmarkPage, bookmarks }) => {
  handleDeleteBookmark = () => {
    deleteBookmarks({ storyId: story.id });
  };

  handleClick = () => {
    <Redirect to={`/stories/${story.id}`} />;
  };

  return (
    <div>
      <div onClick={handleClick}>
        <img src={story.image} width="100px" height="100px" />
        <span>{story.title}</span>
      </div>
      {bookmarkPage ? <button onClick={handleDeleteBookmark}>Remove</button> : null}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteBookmarks: payload => dispatch(Actions.deleteBookmarks(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(StoryItem);
