import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/main.scss';

import store from './store';
import Home from './pages/Home';
import Stories from './pages/Stories';
import Photos from './pages/Photos';
import Drafts from './pages/Drafts';
import Favourites from './pages/Favourites';
import About from './pages/About';
import Contact from './pages/Contact';
import Logout from './pages/Logout';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/stories/page/:pageNo" exact component={Stories} />
        <Route path="/stories/:storyId" exact component={Story} />
        <Route path="/photos/page/:pageNo" exact component={Photos} />
        <Route path="/photos/:photoId" exact component={Photo} />
        <Route path="/drafts" exact component={Drafts} />
        <Route path="/drafts/:draftId" exact component={Draft} />
        <Route path="/favourites" exact component={Favourites} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  </Provider>
);

render(<App />, document.getElementById('app'));
