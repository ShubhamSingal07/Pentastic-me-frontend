import { combineReducers } from 'redux';

import aboutReducer from './aboutReducer';
import authReducer from './authReducer';
import contactReducer from './contactReducer';
import photoReducer from './photoReducer';
import photosReducer from './photosReducer';
import storiesReducer from './storiesReducer';
import storyReducer from './storyReducer';
import userReducer from './userReducer';
import bookmarksReducer from './bookmarksReducer';
import draftsReducer from './draftsReducer';
import draftReducer from './draftReducer';
import imagesReducer from './imagesReducer';
import usersReducer from './usersReducer';

const Reducer = combineReducers({
  about: aboutReducer,
  auth: authReducer,
  contact: contactReducer,
  photo: photoReducer,
  photos: photosReducer,
  stories: storiesReducer,
  story: storyReducer,
  user: userReducer,
  bookmarks: bookmarksReducer,
  draft: draftReducer,
  drafts: draftsReducer,
  images: imagesReducer,
  users: usersReducer,
});

export default Reducer;
