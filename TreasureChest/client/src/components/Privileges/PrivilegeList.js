import React, { useEffect, useState } from "react";
import Privilege from './Privilege';
import { useHistory } from "react-router";
import { getAllPrivileges } from "../../modules/PrivilegeManager";

const PrivilegeList = () => {
  const [ privileges, setPrivileges] = useState([]);
  const history = useHistory();
  const getPrivileges = () => {
    getAllPrivileges().then( privileges => setPrivileges( privileges));
  };
  useEffect(() => {
    getPrivileges();
  }, []);

  return (
    
    <div className="container">
      <button type="button"
				className="btn btn-warning"
				onClick={() => {history.push("/Privilege/create")}}>
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