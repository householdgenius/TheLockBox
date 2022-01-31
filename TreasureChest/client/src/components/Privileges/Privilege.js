import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router"

const Privilege = ({privilege}) => {
  const history = useHistory();
  return (
    <Card >
      <CardBody>
        <p>
          <strong>{privilege.description}</strong>
        </p>
      </CardBody>
      <Button className="button"type="button" onClick={() => {history.push( `/Privilege/details/${privilege.id}`)}}>Details</Button>
    </Card>
  );
};



export default Privilege;
