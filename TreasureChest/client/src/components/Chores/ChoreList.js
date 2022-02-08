import React, { useEffect, useState } from "react";
import Chore from './Chore';
import { useHistory } from "react-router";
import { getAllChores } from "../../modules/ChoreManager";
import { ListGroupItem } from "reactstrap";
import { _getUserData } from "../../modules/authManager";


const ChoreList = () => {
  const [ chores, setChores] = useState([]);
  const [user, setUser] = useState({});
  const history = useHistory();
  const getChores = () => {
    getAllChores().then( chores => setChores(chores));
  };

  useEffect(() => {
    getChores();
  }, []);

  useEffect(() => {
    _getUserData().then(user => setUser(user))
  }, [])

  const handleClick = () => {
    if(user.isAdmin == true){
 history.push("/Chore/create")
    }
  }

  return (
    <div className="container-sm">
      <button type="button"
				className="btn btn-warning"
				onClick={handleClick}>
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