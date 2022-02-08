import React, { useEffect, useState } from "react";
import Privilege from './Privilege';
import { useHistory } from "react-router";
import { getAllPrivileges } from "../../modules/PrivilegeManager";
import { _getUserData } from "../../modules/authManager";

const PrivilegeList = () => {
  const [ privileges, setPrivileges] = useState([]);
  const [user, setUser] = useState({});
  const history = useHistory();
  const getPrivileges = () => {
    getAllPrivileges().then( privileges => setPrivileges( privileges));
  };
  useEffect(() => {
    getPrivileges();
  }, []);

  useEffect(() => {
      _getUserData().then(user => setUser(user))
    }, [])

 const handleClick = () => {
   if(user.isAdmin == true){
history.push("/Privilege/create")
   }
 }

  return (
    
    <div className="container">
      <button type="button"
				className="btn btn-warning"
				onClick={handleClick}>
				Add Privilege
			</button>
      <div className="row justify-content-center">
        {privileges.map((privilege) => (
          <Privilege privilege={privilege} key={privilege.id}/>
        ))}
      </div>
    </div>
  );
};

export default PrivilegeList;