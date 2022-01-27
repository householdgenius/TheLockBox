import React from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory } from "react-router"

const Privilege = ({privilege}) => {
  const history = useHistory();
  return (
    <Card >
      <CardBody>
        <p>
          <strong>{privilege.description}</strong>
          <button className="button"type="button" onClick={() => {history.push( `/Privilege/delete/${privilege.id}`)}}>Delete</button>
          <button className="button" type="button" onClick={() => history.push(`/Privilege/${privilege.id}/edit`)}>Edit</button>
        </p>
      </CardBody>
    </Card>
  );
};



export default Privilege;
