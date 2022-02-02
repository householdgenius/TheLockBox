import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getPrivilegeById, update } from "../../modules/PrivilegeManager";

 
export const EditPrivilege = () => {
    const [privilege, setPrivilege] = useState({ description: "" });
    const [isLoading, setIsLoading] = useState(false);

    const { privilegeId } = useParams();
    const history = useHistory();

    const handleFieldChange = event => {
        const stateToChange = { ...privilege };
        stateToChange[event.target.id] = event.target.value;
        setPrivilege(stateToChange);
    };

    const updateExistingPrivilege = event => {
        event.preventDefault()
        setIsLoading(true);
        const editedPrivilege = {
            id: privilegeId,
            description: privilege.description
        }
        update(editedPrivilege)
            .then(() => history.push("/Privilege")
            )
    }

    const cancelAndGoBack = () => history.push("/Privilege");

    useEffect(() => {
        getPrivilegeById(privilegeId)
            .then(privilege => {
                setPrivilege(privilege);
                setIsLoading(false);
            });
    }, [privilegeId]);

    return (
        <>
            <form>
                <fieldset >
                    <h2 className="privilegeForm__title">Edit Privilege</h2>
                    <div className="formgroup">
                        <label htmlFor="name"> Privilege </label>
                        <input type="text" required className="form-control" onChange={handleFieldChange} id="name" value={privilege.description} placeholder={"Enter a new Value"} />
                        <button type="button" disabled={isLoading} onClick={updateExistingPrivilege} className="button"> Submit </button>
                        <button type="button" disabled={isLoading} onClick={cancelAndGoBack} className="button"> Cancel </button>
                    </div>

                </fieldset>
            </form>
        </>
    );
}


