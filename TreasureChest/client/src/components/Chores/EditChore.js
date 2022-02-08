import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getChoreById, update, updateChoreUsers } from "../../modules/ChoreManager";
import { getAllPrivileges } from "../../modules/PrivilegeManager";
import { getAllUsers } from "../../modules/authManager";
import { Card } from "reactstrap";

export const EditChore = () => {
    const [chore, setChore] = useState({ name: "", privilegeId: 0, date:""});
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { choreId } = useParams();
    const [privileges, setPrivileges] = useState([]);
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const handleFieldChange = event => {
        const stateToChange = { ...chore };
        stateToChange[event.target.id] = event.target.value;
        setChore(stateToChange);
    };
    const handleMultiSelect = event => {
        const selectedUsers = []
        for(let i = 0; i< event.target.selectedOptions.length; i++){
            selectedUsers.push(parseInt(event.target.selectedOptions[i].value))
        }
        setSelectedUsers(selectedUsers)
    }
    useEffect(() => {
        getAllPrivileges()
        .then(res => {
            setPrivileges(res)
        })
        getAllUsers()
            .then(res => {
                setUsers(res)
            })
        getChoreById(choreId)
            .then(chore => {
                setChore(chore);
                setSelectedUsers(chore.users.map(u =>u.id))
                setIsLoading(false);
            });
    }, []);

    const updateExistingChore = event => {
        event.preventDefault()
        setIsLoading(true);
        const editedChore = {
            id: choreId,
            name: chore.name,
            privilegeId: chore.privilegeId,
            dateCompleted: new Date(chore.dateCompleted).toISOString()
        }
            Promise.all([update(editedChore), updateChoreUsers({choreId, userIds:selectedUsers})])
            .then(() => history.push("/Chore"))
    }
    
    const cancelAndGoBack = () => history.push("/Chore");

    return (
        <>
        <Card body color="dark"
                    inverse>
            <form>
                    <h2 className="choreForm__title">Edit Chore</h2>
                    <div className="formgroup">
                        <input type="text" required className="form-control" onChange={handleFieldChange} id="name" value={chore.name} placeholder={"Enter a new Value"} />
                        </div>
                        <div className="formgroup">
                        <select multiple type="text" id="userId" onChange={handleMultiSelect} value={selectedUsers} required autoFocus className="form-control"> <option value="0">Assign to User: </option>
                    {users.map(u => (<option key={u.id} value={u.id} >
                        {u.name}
                    </option>))}</select></div>
                    <div className="formgroup">
                        <select type="text" id="privilege" onChange={handleFieldChange} required autoFocus className="form-control">
                    <option value="0">Select Privilege</option>
                    {privileges.map(p => (<option key={p.id} value={p.id}>
                        {p.description}
                    </option>))}
                </select></div>
                <div className="formgroup"><input type="date" required className="form-control" onChange={handleFieldChange} id="dateCompleted" placeholder={"Enter a new Value"} /></div>
                        <button type="button" disabled={isLoading} onClick={updateExistingChore} className="btn btn-warning"> Submit </button>
                        <button type="button" disabled={isLoading} onClick={cancelAndGoBack} className="btn btn-warning"> Cancel </button>
            </form>
            </Card>
        </>
    );
}


