import React from 'react';
import './App.css';
import Index from './Pages/index'
import Poll from './Pages/poll'
import Signup from './Pages/signup'
import Login from './Pages/login'
import Verify from './Pages/verify'
import {Switch, Route} from 'react-router-dom'
function App(props) {
  return (
    <Switch>
      <Route exact path='/' component={Index} />
      <Route exact path='/polls/:id' component={Poll} />
      <Route exact path='/verify/:id' component={Verify} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' component={Login} />
    </Switch>
  );

  
}

export default App;
