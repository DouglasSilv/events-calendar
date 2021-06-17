import React from 'react';
import { Route, Router } from 'react-router';
import Months from './pages/Months';
import { createBrowserHistory } from 'history';
import './styles/global.css';
import Welcome from './components/Welcome';
import MonthCalendar from './components/MonthCalendar';

export const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <div>
      <Welcome />
      <Router history={history}>
        <Route path="/" exact component={Months} />
        <Route path="/month/:index" exact component={MonthCalendar} />
      </Router>
    </div>
  );
};

export default App;
