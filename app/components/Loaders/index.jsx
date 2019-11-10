import React from 'react';
import { withRouter } from 'react-router-dom';

import StoryLoader from './StoryLoader';
import PhotoLoader from './PhotoLoader';
import BookmarksLoader from './BookmarksLoader';
import Draftsloader from './DraftsLoader';
import SpinnerLoader from './SpinnerLoader';

const Loaders = ({ location }) => {
  if (location.pathname.startsWith('/stories/page/')) return <StoryLoader />;
  if (location.pathname.startsWith('/photos/page/')) return <PhotoLoader />;
  if (location.pathname.startsWith('/bookmarks')) return <BookmarksLoader />;
  if (location.pathname === '/drafts') return <Draftsloader />;
  if (location.pathname === '/users') return <SpinnerLoader />;
  return <div />;
};

export default withRouter(Loaders);
