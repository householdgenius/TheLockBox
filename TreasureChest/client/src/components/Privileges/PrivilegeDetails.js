import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getPrivilegeById } from "../../modules/PrivilegeManager";
import { Card, CardHeader, CardBody, CardFooter, CardImg } from "reactstrap";
import { _getUserData } from "../../modules/authManager";
import PrivilegeList from "./PrivilegeList";


const PrivilegeDetails = () => {
    const [privilege, setPrivilege] = useState();
    const [user, setUser] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getPrivilegeById(id).then(setPrivilege)
    }, [])

    useEffect(() => {
        _getUserData().then(user => setUser(user))
      }, [])
  
   const handleClickEdit = () => {
     if(user.isAdmin == true){
  history.push(`/Privilege/${privilege.id}/edit`)
     }
   }

   const handleClickDelete = () => {
    if(user.isAdmin == true){
 history.push(`/Privilege/delete/${privilege.id}`)
    }
  }


    if (!privilege) {
        return null
    }


else{
    return (
        <div className="privilegeDetailsCard">
            <h2>Privilege Details</h2>
            < Card body color="dark"
    inverse >
                <CardBody>
                    <strong>Privilege: {privilege.description}<br></br></strong>
                    <strong>Chores:</strong>
                    <ul>
                        {privilege.chores.map((chore) => <li key={chore.id}>{chore.name}</li>)}
                    </ul>
                </CardBody>
                <CardFooter>
                    <button className="btn btn-warning" type="button" onClick={handleClickEdit}>Edit</button>
                    <button className="btn btn-warning"type="button" onClick={() => {history.push( `/Privilege`)}}>Cancel</button>
                    <button className="btn btn-danger"type="button" onClick={handleClickDelete}>Delete</button>
                </CardFooter>
            </Card>
        </div >
    )
}
}

export default PrivilegeDetails;