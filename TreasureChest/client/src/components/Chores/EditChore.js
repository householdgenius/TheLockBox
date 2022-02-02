import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getChoreById, update } from "../../modules/ChoreManager";


export const EditChore = () => {
    const [chore, setChore] = useState({ name: "" });
    const [isLoading, setIsLoading] = useState(false);

    const { choreId } = useParams();
    const history = useHistory();

    const handleFieldChange = event => {
        const stateToChange = { ...chore };
        stateToChange[event.target.id] = event.target.value;
        setChore(stateToChange);
    };

    const updateExistingChore = event => {
        event.preventDefault()
        setIsLoading(true);
        const editedChore = {
            id: choreId,
            name: chore.name
        }
        update(editedChore)
            .then(() => history.push("/Chore")
            )
    }

    const cancelAndGoBack = () => history.push("/Chore");

    useEffect(() => {
        getChoreById(choreId)
            .then(chore => {
                setChore(chore);
                setIsLoading(false);
            });
    }, [choreId]);

    return (
        <>
            <form>
                <fieldset >
                    <h2 className="choreForm__title">Edit Chore</h2>
                    <div className="formgroup">
                        <label htmlFor="name"> Chore </label>
                        <input type="text" required className="form-control" onChange={handleFieldChange} id="name" value={chore.name} placeholder={"Enter a new Value"} />
                        <button type="button" disabled={isLoading} onClick={updateExistingChore} className="button"> Submit </button>
                        <button type="button" disabled={isLoading} onClick={cancelAndGoBack} className="button"> Cancel </button>
                    </div>

                </fieldset>
            </form>
        </>
    );
}


