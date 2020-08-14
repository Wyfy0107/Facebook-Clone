import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/protected-routes/Layout";

function App() {
  const [isAuthenticated, setAuthenticate] = useState(true);

  useEffect(() => keepLoggedIn(), []);

  const keepLoggedIn = () => {
    const cookie = document.cookie;
    const token = cookie.split("=")[1];
    if (!token) {
      setAuthenticate(false);
    }
  };

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          {isAuthenticated ? (
            <Redirect to='/dashboard' />
          ) : (
            <Login setAuth={setAuthenticate} />
          )}
        </Route>

        <Route path='/dashboard'>
          {isAuthenticated ? (
            <Layout setAuth={setAuthenticate} />
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
