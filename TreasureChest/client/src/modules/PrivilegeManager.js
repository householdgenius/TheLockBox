import { getToken } from "./authManager";
const _apiUrl = "/api/Privilege";

export const getAllPrivileges = () => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to get privileges.");
      }
    });
  });
};

export const getPrivilegeById = (id) => {
  return getToken().then((token) => {
      return fetch(`${_apiUrl}/${id}`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
          .then(res => res.json())
  })
}

export const addPrivilege = (newPrivilege) => {
  return getToken().then((token) => {
      return fetch(_apiUrl, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newPrivilege)
      }).then((res) => {
          if (res.ok) {
              return res.json();
          } else {
              throw new Error("An unknown error occurred while trying to get privileges.");
          }
      });
  });
};

export const update = (editedPrivilege) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${editedPrivilege.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedPrivilege)
    }).then((res) => {
      if (res.ok) {
        return
      } else {
        throw new Error("An unknown error occurred while trying to get privileges.");
      }
    });
  });
};

export const deletePrivilege = (privilege) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${privilege}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(privilege)
    }).then((res) => {
      if (res.ok) {
        return
      } else {
        throw new Error("An unknown error occurred while trying to get privileges.");
      }
    });
  });
};