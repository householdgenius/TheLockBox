import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router"

const Chore = ({chore}) => {
  const history = useHistory();
  return (
    <Card
    body color="dark"
    inverse
    >
      <CardBody>
        <p>
          <strong>{chore.name}</strong>
        </p>
        <Button className="btn btn-warning"type="button" onClick={() => {history.push( `/Chore/details/${chore.id}`)}}>Details</Button>
      </CardBody>
    </Card>
  );
};



export default Chore;