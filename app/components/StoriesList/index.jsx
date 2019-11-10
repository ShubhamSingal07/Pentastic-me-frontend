import React from 'react';

import './style.scss';
import StoryItem from './StoryItem';

class StoriesList extends React.Component {
  render() {
    const { stories, bookmarkPage, username } = this.props;
    return (
      <div>
        {stories.length === 0 ? (
          bookmarkPage ? (
            <div className="alert alert-warning bookmark-alert">You do not have any story bookmarked</div>
          ) : (
            <div className="alert alert-warning">There is no story by Author yet</div>
          )
        ) : (
          <div className={bookmarkPage ? '' : 'container-fluid row'}>
            {stories.map((story, idx) => (
              <StoryItem story={story} key={story._id} bookmarkPage={bookmarkPage} name={username} index={idx} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

// const mapStateToProps = ({ user }) => ({
//   username: user.date.username,
// });

export default StoriesList;
