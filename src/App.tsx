import React from 'react';
import { Router, Route } from 'react-router-dom';
import firebaseConfig from './configs/firebase';
import history from './history';
import './App.css';
import 'antd/dist/antd.css';
import Login from './containers/login';
import Messages from './containers/messages';

function App() {
  // runSample();

  return (
    <Router history={history}>
      <div className="App">
        <Route exact path="/" component={Messages} />
        <Route exact path='/login' component={Login} />
        <Route path='/channel' component={Messages} />
      </div>
    </Router>
  );
}

export default App;
