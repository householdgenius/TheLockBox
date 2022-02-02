import React, { useState} from "react";
import { useHistory } from "react-router";
import {  addPrivilege } from "../../modules/PrivilegeManager"


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
		<form className="form-group">
			<fieldset>
			<h2 className="privilegeForm__title">New Privilege</h2>
				<div className="form-group">
					<label htmlFor="name">Privilege:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Privilege Name" value={privilege.description} />
				</div>
			<button className="btn btn-primary" onClick={handleClickSavePrivilege}>Save Privilege</button>
			</fieldset>
		</form>
	)
};

export default AddPrivilege;