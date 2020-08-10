import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";

function App() {
  const [isAuthenticated, setAuthenticate] = useState(false);

  useEffect(() => keepLoggedIn(), []);

  const keepLoggedIn = () => {
    const cookie = document.cookie;
    const token = cookie.split("=")[1];
    if (token) {
      setAuthenticate(true);
    }
  };

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
          {isAuthenticated ? (
            <Profile setAuth={setAuthenticate} />
          ) : (
            <Redirect to='/' />
          )}
        </Route>

        <Route path='/register'>
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
