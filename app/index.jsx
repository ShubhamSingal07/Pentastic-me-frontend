import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/main.scss';

import store from './store';
import Home from './pages/Home';
import Stories from './pages/Stories';
import Story from './pages/Story';
import Photos from './pages/Photos';
import Photo from './pages/Photo';
import Drafts from './pages/Drafts';
import Draft from './pages/Draft';
import Bookmarks from './pages/Bookmarks';
import Write from './pages/Write';
import Upload from './pages/Upload';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';

const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/stories/write" exact component={Write} />
        <Route path="/stories/page/:pageNo" exact component={Stories} />
        <Route path="/stories/:storyId" exact component={Story} />
        <Route path="/photos/upload" exact component={Upload} />
        <Route path="/photos/page/:pageNo" exact component={Photos} />
        <Route path="/photos/:photoId" exact component={Photo} />
        <Route path="/drafts" exact component={Drafts} />
        <Route path="/drafts/:draftId" exact component={Draft} />
        <Route path="/bookmarks" exact component={Bookmarks} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
      </Switch>
    </Router>
  </Provider>
);

render(<App />, document.getElementById('app'));
