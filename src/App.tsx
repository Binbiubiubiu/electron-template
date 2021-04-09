import 'core-js/stable';
import 'regenerator-runtime/runtime';

import ReactDom from 'react-dom';
import { makeAutoObservable } from 'mobx';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import loadable from '@loadable/component';
import './styles/style.less';
// import { Home } from './pages/Home';
import { About } from './pages/About';
import { Dashboard } from './pages/Dashboard';

const Home = loadable(() => import('./pages/Home'), {
  fallback: <div>loading...</div>,
});

class Timer {
  secondsPassed = 0;
  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }
}

const myTimer = new Timer();

const TimerView = observer(() => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>

      <hr />

      {/*
      A <Switch> looks through all its children <Route>
      elements and renders the first one whose path
      matches the current URL. Use a <Switch> any time
      you have multiple routes, but you want only one
      of them to render at a time
    */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  </Router>
));

setInterval(() => {
  myTimer.increaseTimer();
}, 1000);

ReactDom.render(<TimerView />, document.getElementById('app'));
