import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getChoreById } from "../../modules/ChoreManager";
import { Card, CardHeader, CardBody, CardFooter, CardImg } from "reactstrap";


const ChoreDetails = () => {
    const [chore, setChore] = useState();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getChoreById(id).then(setChore)
    }, [])

    if (!chore) {
        return null
    }


    else {
        return (
            <div className="choreDetailsCard">
                < Card body color="dark"
                    inverse>  <h2>Chore Details</h2>
                    <strong>Chore: {chore.name}</strong><br></br>
                    <strong>Assigned To:</strong><br></br>
                    <ol>
                        {chore.users.map(user => <li key={user.id}>{user.name}</li>)}
                    </ol>
                    <strong>Privilege: {chore.privilege.description}</strong><br></br>
                    <strong>Complete By: {chore.dateCompleted}</strong><br></br>
                    <CardFooter>
                        <button className="btn btn-warning" type="button" onClick={() => history.push(`/Chore/${chore.id}/edit`)}>Edit</button>
                        <button className="btn btn-warning" type="button" onClick={() => { history.push(`/Chore/delete/${chore.id}`) }}>Delete</button>
                    </CardFooter>
                </Card>
            </div >
        )
    }
}

export default ChoreDetails;