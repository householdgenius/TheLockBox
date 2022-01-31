import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router"

const Chore = ({chore}) => {
  const history = useHistory();
  return (
    <Card >
      <CardBody>
        <p>
          <strong>{chore.name}</strong>
          <Button className="button"type="button" onClick={() => {history.push( `/Chore/details/${chore.id}`)}}>Details</Button>
        </p>
      </CardBody>
    </Card>
  );
};



export default Chore;