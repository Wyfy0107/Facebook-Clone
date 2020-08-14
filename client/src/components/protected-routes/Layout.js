import React from "react";
import NewsFeed from "./NewsFeed";
import Profile from "./Profile";
import { Switch, Route } from "react-router-dom";

function Layout({ setAuth }) {
  return (
    <div>
      <Switch>
        <Route path='/dashboard/newsfeed'>
          <NewsFeed setAuth={setAuth} />
        </Route>
        <Route exact path='/dashboard'>
          <Profile setAuth={setAuth} />
        </Route>
      </Switch>
    </div>
  );
}

export default Layout;
