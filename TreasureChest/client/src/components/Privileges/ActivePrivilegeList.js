import React, { useEffect, useState } from "react";
import ActivePrivilege from './ActivePrivilege';
import { useHistory } from "react-router";
import { getActivePrivileges } from "../../modules/PrivilegeManager";

const ActivePrivilegeList = () => {
  const [ privileges, setPrivileges] = useState([]);
  const history = useHistory();
  const getPrivileges = () => {
    getActivePrivileges().then( privileges => setPrivileges( privileges));
  };
  useEffect(() => {
    getPrivileges();
  }, []);

  return (
    
    <div className="container">
      <div className="row justify-content-center">
        {privileges.map((privilege) => (
          <ActivePrivilege privilege={privilege} key={privilege.id}/>
        ))}
      </div>
    </div>
  );
};

export default ActivePrivilegeList;