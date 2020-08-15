import React from "react";
import NewsFeed from "./NewsFeed";
import Profile from "./Profile";
import { Switch, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function Layout({ setAuth }) {
  return (
    <div>
      <Nav
        style={{
          background: "#242526",
          height: "8vh",
          alignItems: "center",
          fontSize: "1.3rem",
        }}
        className='justify-content-center'
        activeKey='/home'
      >
        <Nav.Item>
          <Link style={{ margin: "1rem" }} to='/dashboard/newsfeed'>
            NewsFeed
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link style={{ margin: "1rem" }} to='/dashboard'>
            Profile
          </Link>
        </Nav.Item>
      </Nav>

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
