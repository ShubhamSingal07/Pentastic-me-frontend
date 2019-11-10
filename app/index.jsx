import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/main.scss';

import store from './store';
import Navbar from './components/Navbar';
import Loaders from './components/Loaders';

const Home = lazy(() => import('./pages/Home'));
const Stories = lazy(() => import('./pages/Stories'));
const Story = lazy(() => import('./pages/Story'));
const Photos = lazy(() => import('./pages/Photos'));
const Photo = lazy(() => import('./pages/Photo'));
const Drafts = lazy(() => import('./pages/Drafts'));
const Draft = lazy(() => import('./pages/Draft'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));
const Write = lazy(() => import('./pages/Write'));
const Upload = lazy(() => import('./pages/Upload'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Error404 = lazy(() => import('./components/Error/Error404'));

const App = () => (
  <>
    <Provider store={store}>
      <Router>
        <Navbar />
        <Suspense fallback={<Loaders />}>
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
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/*" exact component={Error404} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  </>
);

render(<App />, document.getElementById('app'));
