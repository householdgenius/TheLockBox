import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getPrivilegeById } from "../../modules/PrivilegeManager";
import { Card, CardHeader, CardBody, CardFooter, CardImg } from "reactstrap";


const PrivilegeDetails = () => {
    const [privilege, setPrivilege] = useState();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getPrivilegeById(id).then(setPrivilege)
    }, [])

    if (!privilege) {
        return null
    }


else{
    return (
        <div className="privilegeDetailsCard">
            <h2>Privilege Details</h2>
            < Card >
                <CardBody>
                    {privilege.description}
                </CardBody>
                <CardFooter>
                    <button className="button" type="button" onClick={() => history.push(`/Privilege/${privilege.id}/edit`)}>Edit</button>
                    <button className="button"type="button" onClick={() => {history.push( `/Privilege/delete/${privilege.id}`)}}>Delete</button>
                </CardFooter>
            </Card>
        </div >
    )
}
}

export default PrivilegeDetails;