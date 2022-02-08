import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PrivilegeList from "./Privileges/PrivilegeList";
import ChoreList from "./Chores/ChoreList";
import PrivilegeDetails from "./Privileges/PrivilegeDetails";
import ChoreDetails from "./Chores/ChoreDetails"
import AddChore from "./Chores/AddChore";
import AddPrivilege from "./Privileges/AddPrivilege";
import { EditPrivilege } from "./Privileges/EditPrivilege";
import { EditChore } from "./Chores/EditChore";
import DeleteChore from "./Chores/DeleteChore";
import DeletePrivilege from "./Privileges/DeletePrivilege";
import ActivePrivilegeList from "./Privileges/ActivePrivilegeList";

export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
      <Route path="/" exact>
      {isLoggedIn ? <PrivilegeList />: <Redirect to="/login" />}
        </Route>
        <Route path="/Privilege" exact>
        {isLoggedIn ? <PrivilegeList />: <Redirect to="/login" />}
        </Route>
        <Route path="/activePrivileges">
        {isLoggedIn ? <ActivePrivilegeList />: <Redirect to="/login" />}
        </Route>
        <Route path="/Privilege/details/:id">
          <PrivilegeDetails />
        </Route >
        <Route path="/Privilege/create">
          <AddPrivilege />
        </Route >
        <Route path="/Privilege/:privilegeId(\d+)/edit">
          <EditPrivilege />
        </Route>
        <Route path="/Privilege/delete/:privilegeId(\d+)">
          <DeletePrivilege />
        </Route>
        <Route path="/Chore" exact>
        {isLoggedIn ? <ChoreList />: <Redirect to="/login" />}
        </Route>
        <Route path="/Chore/details/:id">
          <ChoreDetails />
        </Route >
        <Route path="/Chore/create">
          <AddChore />
        </Route >
        <Route path="/Chore/:choreId(\d+)/edit">
          <EditChore />
        </Route>
        <Route path="/Chore/delete/:choreId(\d+)">
          <DeleteChore />
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