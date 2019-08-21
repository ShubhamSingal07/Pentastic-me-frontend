import { combineReducers } from 'redux';

import aboutReducer from './aboutReducer';
import authReducer from './authReducer';
import contactReducer from './contactReducer';
import photoReducer from './photoReducer';
import photosReducer from './photosReducer';
import storiesReducer from './storiesReducer';
import storyReducer from './storyReducer';
import userReducer from './userReducer';

const Reducer = combineReducers({
  about: aboutReducer,
  auth: authReducer,
  contact: contactReducer,
  photo: photoReducer,
  photos: photosReducer,
  stories: storiesReducer,
  story: storyReducer,
  user: userReducer,
});

export default Reducer;
