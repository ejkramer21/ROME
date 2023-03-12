import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    console.log('user:', user);
    useEffect(()=>{
        if(!user){
            //grabbing response from the data returned from profile
            axios.get("/profile").then(({data})=>{
                setUser(data);

            });
        }
    }, []);

return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
);
}
