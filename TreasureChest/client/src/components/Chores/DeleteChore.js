import React from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory, useParams } from "react-router";
import { deleteChore } from "../../modules/ChoreManager";


const DeleteChore = ({ }) => {
    const history = useHistory();
    const { choreId } = useParams();
    const handleDeleteChore = () => {
        deleteChore(choreId)
            .then(() => history.push("/Chore"));
    };

    return (
        <Card >
            <CardBody>
                <p>
                    <strong>Are you sure you want to delete this Chore?</strong>
                    <button className="button" type="button" onClick={() => { history.push("/Chore") }}> No </button>
                    <button className="button" type="button" onClick={handleDeleteChore}> Yes </button>
                </p>
            </CardBody>
        </Card>
    );
};

export default DeleteChore;