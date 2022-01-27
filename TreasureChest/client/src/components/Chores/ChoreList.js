import React, { useEffect, useState } from "react";
import Chore from './Chore';
import { useHistory } from "react-router";
import { getAllChores } from "../../modules/ChoreManager";

const ChoreList = () => {
  const [ chores, setChores] = useState([]);
  const history = useHistory();
  const getChores = () => {
    getAllChores().then( chores => setChores(chores));
  };

  useEffect(() => {
    getChores();
  }, []);

  return (
    
    <div className="container">
      <button type="button"
				className="button"
				onClick={() => {history.push("/Chore/create")}}>
				Add Chore
			</button>
      <div className="row justify-content-center">
        {chores.map((chore) => (
          <Chore chore={chore} key={chore.id}/>
        ))}
      </div>
    </div>
  );
};

export default ChoreList;