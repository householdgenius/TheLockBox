import React, { useState} from "react";
import { useHistory } from "react-router";
import {  addPrivilege } from "../../modules/PrivilegeManager"
import { Card } from "reactstrap";


 const AddPrivilege = () => {
    const [privilege, setPrivilege] = useState({
        description: "",
    });

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newPrivilege = { ...privilege }
        newPrivilege[event.target.id] = event.target.value;
        setPrivilege(newPrivilege)
    }

    const handleClickSavePrivilege = (event) => {
		event.preventDefault()
            addPrivilege(privilege)
                .then(() => history.push("/Privilege"))
    }
     
    return (
        <Card  body color="dark"
        inverse>
		<form className="form-group">
			<fieldset>
			<h2 className="privilegeForm__title">New Privilege</h2>
				<div className="form-group">
					<label htmlFor="name">Privilege:</label>
					<input type="text" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Privilege Name" />
				</div>
			<button className="btn btn-warning" onClick={handleClickSavePrivilege}>Save Privilege</button>
			</fieldset>
		</form>
        </Card>
	)
};

export default AddPrivilege;