import React from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory, useParams } from "react-router";
import { deletePrivilege } from "../../modules/PrivilegeManager";


const DeletePrivilege = ({ }) => {
    const history = useHistory();
    const { privilegeId } = useParams();
    const handleDeletePrivilege = () => {
        deletePrivilege(privilegeId)
            .then(() => history.push("/Privilege"));
    };

    return (
        <Card >
            <CardBody>
                <p>
                    <strong>Are you sure you want to delete this Privilege?</strong>
                    <button className="button" type="button" onClick={() => { history.push("/Privilege") }}> No </button>
                    <button className="button" type="button" onClick={handleDeletePrivilege}> Yes </button>
                </p>
            </CardBody>
        </Card>
    );
};

export default DeletePrivilege;