import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Layout from './Layout';

const App = () => (
  <Router>
    <Route path="/">
      <Layout />
    </Route>
  </Router>
);

export default App;
