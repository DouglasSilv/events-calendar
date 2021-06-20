import React from 'react';
import { Route, Router } from 'react-router';
import Months from './pages/Months';
import { createBrowserHistory } from 'history';
import './styles/global.css';
import Welcome from './components/Welcome';
import MonthCalendar from './components/MonthCalendar';
import Login from './pages/Login';
import jwt_decode from 'jwt-decode';

export const history = createBrowserHistory();

interface Token {
  name: string;
  exp: number;
}

const tokenIsValid = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  const decodedToken: Token = jwt_decode(token);
  const currentDate = new Date();
  return !(decodedToken?.exp * 1000 < currentDate.getTime());
};

const App: React.FC = () => {
  const isLogin = history.location.pathname === '/login';
  if (!isLogin && !tokenIsValid()) {
    history.push('/login');
  }
  return (
    <div>
      <Welcome />
      <Router history={history}>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Months} />
        <Route path="/month/:index" exact component={MonthCalendar} />
      </Router>
    </div>
  );
};

export default App;
