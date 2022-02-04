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
        <Card body color="dark"
        inverse>
            <CardBody>
                <p>
                    <strong>Are you sure you want to delete this Privilege?</strong>
                </p>
                <button className="btn btn-warning" type="button" onClick={() => { history.push("/Privilege") }}> No </button>
                <button className="btn btn-warning" type="button" onClick={handleDeletePrivilege}> Yes </button>
                </CardBody>
        </Card>
    );
};

export default DeletePrivilege;