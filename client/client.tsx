import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import App from '@/App';
import Document from '@pages/Document';
import GlobalStyle from '@/styles/GlobalStyle';
import { v4 as uuidV4 } from 'uuid';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://localhost:3090' : 'http://localhost:3090';

render(
  <Router>
    <GlobalStyle />
    <Switch>
      <Route path="/" exact>
        <App />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
      </Route>
      <Route path="/documents" exact>
        <Redirect to={`/documents/${uuidV4()}`} />
      </Route>
      <Route path="/documents/:id">
        <Document />
      </Route>
    </Switch>
  </Router>,
  document.querySelector('#app'),
);
