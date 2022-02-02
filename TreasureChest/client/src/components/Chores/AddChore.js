import React, { useState} from "react";
import { useHistory } from "react-router";
import {  addChore } from "../../modules/ChoreManager"


 const AddChore = () => {
    const [chore, setChore] = useState({
        name: "",
        privilegeId: 0,
        dateCompleted: Date.now(),
    });

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newChore = { ...chore }
        let selectedVal = event.target.value
        if (event.target.id.includes(" ")) {
            selectedVal = parseInt(selectedVal)
        }
        newChore[event.target.id] = selectedVal
        setChore(newChore)
    }

    const handleClickSaveChore = (event) => {
		event.preventDefault()
            addChore(chore)
                .then(() => history.push("/Chore"))
    }
     
    return (
		<form className="form-group">
			<fieldset>
			<h2 className="choreForm__title">New Chore</h2>
				<div className="form-group">
					<label htmlFor="name">Chore:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Chore Name" value={chore.name} />
				</div>
                <div className="form-group">
					<label htmlFor="privilege">Privilege to Earn:</label>
					<input type="text" id="privilege" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Privilege" value={chore.privilegeId} />
				</div>
                <div className="form-group">
					<label htmlFor="name">Chore:</label>
					<input type="date" id="date" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="completion date" value={chore.dateCompleted} />
				</div>
			<button className="btn btn-primary" onClick={handleClickSaveChore}>Save Chore</button>
			</fieldset>
		</form>
	)
};

export default AddChore;