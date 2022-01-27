import React from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory } from "react-router"

const Chore = ({chore}) => {
  const history = useHistory();
  return (
    <Card >
      <CardBody>
        <p>
          <strong>{chore.name}</strong>
          <button className="button"type="button" onClick={() => {history.push( `/Chore/delete/${chore.id}`)}}>Delete</button>
          <button className="button" type="button" onClick={() => history.push(`/Chore/${chore.id}/edit`)}>Edit</button>
        </p>
      </CardBody>
    </Card>
  );
};



export default Chore;