import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../../styles/animation/list-animation.scss';

import * as Actions from '../../../actions';

class StoryItem extends React.Component {
  render() {
    const { story, deleteBookmarks, bookmarkPage, username, index } = this.props;

    const handleDeleteBookmark = () => {
      deleteBookmarks({ storyId: story._id });
    };

    if (bookmarkPage) {
      return (
        <div className="right col-12" style={{ animationDelay: `${0.2 * (index + 1)}s` }}>
          <div className="bookmark-card">
            <div className="w-100">
              <Link to={`/stories/${story._id}`} className="story-link">
                <div className="meta">
                  <div className="photo" style={{ backgroundImage: `url(${story.image})` }} />
                  <ul className="details">
                    <li className="author">Dipanshu Adlakha</li>
                    <li className="date">{story.date}</li>
                  </ul>
                </div>
                <div className="description">
                  <h1>{story.title}</h1>
                  <h2>Let the smile flow</h2>
                  <p className="description-content">{story.description}</p>
                </div>
              </Link>
            </div>
            <p className="remove">
              <button onClick={handleDeleteBookmark}>Remove</button>
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        className={
          index % 3 === 0
            ? 'story-card bottom big-card col-lg-12 col-md-12 col-sm-6 col-12'
            : index % 3 === 1
            ? 'story-card left small-card col-lg-6 col-md-6 col-sm-6 col-12'
            : 'story-card right small-card col-lg-6 col-md-6 col-sm-6 col-12'
        }
        style={{ animationDelay: `${0.2 * (index + 1)}s` }}>
        <Link to={`/stories/${story._id}`} className="story-link">
          <div className="meta">
            <div className="photo" style={{ backgroundImage: `url(${story.image})` }} />
            <ul className="details">
              <li className="author">Dipanshu Adlakha</li>
              <li className="date">{story.date}</li>
            </ul>
          </div>
          <div className="description">
            <h1 className="text-capitalize">{story.title}</h1>
            <h2 className="text-capitalize">Let the smile flow</h2>
            <p className="description-content" style={{ whiteSpace: 'pre-line' }}>
              {story.description}
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteBookmarks: payload => dispatch(Actions.deleteBookmarks(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(StoryItem);
