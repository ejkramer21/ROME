// import axios from "axios";
// import { useState } from 'react';
// const { createContext, useEffect } = require("react");

// const UserContext = createContext();

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     if (!user){
//       axios.get('/profile').then(({data}) => {
//       setUser(data);
//       });
//     } 
//     }, []);
//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}