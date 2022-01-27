import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PrivilegeList from "./Privileges/PrivilegeList";
import ChoreList from "./Chores/ChoreList";
export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
      <Route path="/" exact>
        </Route>
        <Route path="/Privilege">
          <PrivilegeList />
        </Route>
        <Route path="/Chore">
          <ChoreList />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};