import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../../UserContext'
import axios from 'axios'

function PersonalTeamTodo() {
    const [tasks, setTasks] = useState([]);
    const [color,setColor] = useState("");
    const {user, setUser} = useContext(UserContext);

    useEffect( () => {
        console.clear();
        const username = user.userUserName;
        axios.get(`/userteamtasks/${username}`)
        .then(res => {
            const tasksGrabed = res.data;
            tasksGrabed.sort((a,b)=> (a.date<b.date) ? -1 : 1);
            setTasks(tasksGrabed);
        })
        axios.get(`/color/${username}`)
        .then (res => {
            setColor(res.data);
        })
    }, [])


    async function edit_status(task){
        try {
            console.log(task)
            await axios.post('/teamtaskedit', {
                title:task.title,
                description:task.description,
                date:task.date,
                started:false,
                complete:true,
                workers:[],
                team:task.team
            });
            alert("Task Updated in Team");
        } catch (e) {
            alert("Team Task did not Update")
        }
    }

    
    return (
        <div>
            <h1 style={{backgroundColor: color}} id='header'>
                Your Tasks
            </h1>
            
            {tasks.map((task)=> {
                return (
                    <div>
                        <input type="checkbox" onClick={()=>edit_status(task)}></input>
                        {task.title}

                    </div>
                )
            })}
        </div>
    )
}

export default PersonalTeamTodo