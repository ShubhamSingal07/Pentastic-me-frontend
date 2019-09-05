import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Actions from '../../../actions';

const StoryItem = ({ story, deleteBookmarks, bookmarkPage }) => {
  const handleDeleteBookmark = () => {
    deleteBookmarks({ storyId: story._id });
  };
  return (
    <div>
      <Link to={`/stories/${story._id}`}>
        <img src={story.image} width="100px" height="100px" />
        <span>{story.title}</span>
      </Link>
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
