import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/main.scss';

import store from './store';
import Home from './containers/Home';
import Stories from './containers/Stories';
import Photos from './containers/Photos';
import Drafts from './containers/Drafts';
import Favourites from './containers/Favourites';
import About from './containers/About';
import Contact from './containers/Contact';
import Logout from './containers/Logout';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/stories" exact component={Stories} />
        <Route path="/photos" exact component={Photos} />
        <Route path="/drafts" exact component={Drafts} />
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
