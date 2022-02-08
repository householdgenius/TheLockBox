import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router"

const ActivePrivilege = ({privilege}) => {
  const history = useHistory();
  return (
    <Card body color="dark"
    inverse >
      <CardBody>
        <p>
          <strong>Privilege: {privilege.description}</strong><br></br>
          <strong>Active For: {privilege.user.name}</strong><br></br>
          <strong>For Completing: {privilege.chore.name}</strong>
        </p>
      </CardBody>
    </Card>
  );
};



export default ActivePrivilege;