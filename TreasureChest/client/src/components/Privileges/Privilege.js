import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router"

const Privilege = ({privilege}) => {
  const history = useHistory();
  return (
    <Card body color="dark"
    inverse >
      <CardBody>
        <p>
          <strong>{privilege.description}</strong>
        </p>
        <Button className="btn btn-warning"type="button" onClick={() => {history.push( `/Privilege/details/${privilege.id}`)}}>Details</Button>
      </CardBody>
    </Card>
  );
};



export default Privilege;
