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


else{
    return (
        <div className="choreDetailsCard">
            <h2>Chore Details</h2>
            < Card >
                <CardBody>
                    {chore.name}
                </CardBody>
                <CardFooter>
                    <button className="button" type="button" onClick={() => history.push(`/Chore/${chore.id}/edit`)}>Edit</button>
                    <button className="button"type="button" onClick={() => {history.push( `/Chore/delete/${chore.id}`)}}>Delete</button>
                </CardFooter>
            </Card>
        </div >
    )
}
}

export default ChoreDetails;