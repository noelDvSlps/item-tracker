import { getUsers } from "./getUsers";

export const getUserByUsername = ({ username }) =>
   { return getUsers()
    .then((users) => users.find((user) => user.username === username))
    .then((user) => {
      if (!user) {
        throw new Error("user not found");
      }
      
      return user;
    });}
  

export const getUserById = ({ id }) =>
    { 
      return getUsers()
    .then((users) => users.find((user) => user.id === id))
    .then((user) => {
      if (!user) {
        throw new Error("user not found");
      } else {
       return(user);
      }
      
    });
  }

