import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getChoreById } from "../../modules/ChoreManager";
import { Card, CardHeader, CardBody, CardFooter, CardImg } from "reactstrap";
import { _getUserData } from "../../modules/authManager";

const ChoreDetails = () => {
    const [chore, setChore] = useState();
    const [user, setUser] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        _getUserData().then(user => setUser(user))
      }, [])
    
      const handleClickEdit = () => {
        if(user.isAdmin == true){
     history.push(`/Chore/${chore.id}/edit`)
        }
      }

      const handleClickDelete = () => {
        if(user.isAdmin == true){
     history.push(`/Chore/delete/${chore.id}`)
        }
      }

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
                    <ul>
                        {chore.users.map(user => <li key={user.id}>{user.name}</li>)}
                    </ul>
                    <strong>Privilege: {chore.privilege.description}</strong><br></br>
                    <strong>Complete By: {chore.dateCompleted}</strong><br></br>
                    <CardFooter>
                    <button className="btn btn-warning" type="button" onClick={handleClickEdit}>Edit</button>
                        <button className="btn btn-warning" type="button" onClick={() => history.push(`/Chore`)}>Cancel</button>
                        <button className="btn btn-danger" type="button" onClick={handleClickDelete}>Delete</button>
                    </CardFooter>
                </Card>
            </div >
        )
    }
}

export default ChoreDetails;