import React from 'react';

import CommentsItem from './CommentItem';

const CommentsList = ({ comments }) => (
  <div>
    {comments.length > 0 ? comments.map(comment => <CommentsItem comment={comment} key={comment._id} />) : null}
  </div>
);

export default CommentsList;
