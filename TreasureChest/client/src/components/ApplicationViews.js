import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PrivilegeList from "./Privileges/PrivilegeList";
import ChoreList from "./Chores/ChoreList";
import PrivilegeDetails from "./Privileges/PrivilegeDetails";
import ChoreDetails from "./Chores/ChoreDetails"

export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
      <Route path="/" exact>
        </Route>
        <Route path="/Privilege" exact>
          <PrivilegeList />
        </Route>
        <Route path="/Privilege/details/:id">
          <PrivilegeDetails />
        </Route >
        <Route path="/Chore" exact>
          <ChoreList />
        </Route>
        <Route path="/Chore/details/:id">
          <ChoreDetails />
        </Route >
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