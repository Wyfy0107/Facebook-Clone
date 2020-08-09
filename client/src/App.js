import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  const [isAuthenticated, setAuthenticate] = useState(false);

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          {isAuthenticated ? (
            <Redirect to='/profile' />
          ) : (
            <Login setAuth={setAuthenticate} />
          )}
        </Route>

        <Route path='/profile'>
          {isAuthenticated ? <Profile /> : <Redirect to='/' />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
