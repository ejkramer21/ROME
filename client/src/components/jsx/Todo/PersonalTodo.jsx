import React, {useState, useEffect, useContext} from 'react'
import TodoList from './TodoList';
import PersonalTeamTodo from './PersonalTeamTodo';
import axios from 'axios';
import {UserContext} from '../UserContext';

function PersonalTodo() {
    const [type,setType] = useState("Personal");
    const [color,setColor] = useState("");
    const {user, setUser} = useContext(UserContext);

    useEffect( () => {
       // console.clear();
        const username = user.userUserName;
        axios.get(`/color/${username}`)
        .then (res => {
            setColor(res.data);
        })
    }, [])

    function changeType() {
        if (type === "Personal") {
            setType("Team Tasks");
        } else {
            setType("Personal");
        }
    }

    return (
        <div>
            <div style={{backgroundColor: color}}>
                <br></br>
            <button onClick={changeType}>{type}</button>
            </div>
            {(()=>{
                if (type === "Personal") {
                    return (<TodoList/>)
                } else {
                    return (<PersonalTeamTodo/>)
                }
             })()}
        </div>
    )
}

export default PersonalTodo