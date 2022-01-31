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