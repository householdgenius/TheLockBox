import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { addChore } from "../../modules/ChoreManager"
import { getAllPrivileges } from "../../modules/PrivilegeManager";
import { getAllUsers } from "../../modules/authManager";
import { Card } from "reactstrap";


const AddChore = () => {

    const [privileges, setPrivileges] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [chore, setChore] = useState({
        name: "",
        privilegeId: 0,
        userId: 0,
        dateCompleted: new Date(Date.now()).toISOString(),
    });

    const history = useHistory();

    useEffect(() => {
        getAllPrivileges()
        .then(res => {
            setPrivileges(res)
        })
        getAllUsers()
            .then(res => {
                setUsers(res)
            })
    }, [])

    const handleMultiSelect = event => {
        const selectedUsers = []
        for(let i = 0; i< event.target.selectedOptions.length; i++){
            selectedUsers.push(parseInt(event.target.selectedOptions[i].value))
        }
        setSelectedUsers(selectedUsers)
    }

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
        const choreCopy = {...chore }
        choreCopy.dateCompleted = new Date(chore.dateCompleted).toISOString();
        addChore(choreCopy)
            .then(() => history.push("/Chore"))
    }
    const cancelAndGoBack = () => history.push("/Chore");

    return (
        <Card body color="dark"
            inverse>
            <form className="form-group">
                <fieldset>
                    <h2 className="choreForm__title">New Chore</h2>
                    <div className="form-group">
                        <label htmlFor="name">Chore:</label>
                        <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Chore Name" />
                    </div>
                    <div className="formgroup">
                        <select multiple type="text" id="userId" onChange={handleMultiSelect} value={selectedUsers} required autoFocus className="form-control"> <option value="0">Assign to User: </option>
                    {users.map(u => (<option key={u.id} value={u.id} >
                        {u.name}
                    </option>))}</select></div>
                    <div className="form-group">
                        <select type="text" id="privilegeId" onChange={handleControlledInputChange} required autoFocus className="form-control" >
                            <option value="0">Select Privilege</option>
                            {privileges.map(p => (<option key={p.id} value={p.id}>{p.description}</option>))}
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="date" required className="form-control" onChange={handleControlledInputChange} id="date" placeholder={"Enter a new Value"} />
                    </div>
                    <button className="btn btn-warning" onClick={handleClickSaveChore}>Save Chore</button>
                    <button className="btn btn-warning" onClick={cancelAndGoBack}>Cancel</button>
                </fieldset>
            </form>
        </Card>
    )
};

export default AddChore;