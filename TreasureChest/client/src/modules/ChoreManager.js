import { getToken } from "./authManager";
const _apiUrl = "/api/Chore";

export const getAllChores = () => {
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
        throw new Error("An unknown error occurred while trying to get chores.");
      }
    });
  });
};

export const getChoreById = (id) => {
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

export const addChore = (newChore) => {
  return getToken().then((token) => {
      return fetch(_apiUrl, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newChore)
      }).then((res) => {
          if (res.ok) {
              return res.json();
          } else {
              throw new Error("An unknown error occurred while trying to get chores.");
          }
      });
  });
};

export const update = (editedChore) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${editedChore.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedChore)
    }).then((res) => {
      if (res.ok) {
        return
      } else {
        throw new Error("An unknown error occurred while trying to get chores.");
      }
    });
  });
};

export const deleteChore = (chore) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${chore}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chore)
    }).then((res) => {
      if (res.ok) {
        return
      } else {
        throw new Error("An unknown error occurred while trying to get chores.");
      }
    });
  });
};