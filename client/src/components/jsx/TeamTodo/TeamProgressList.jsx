import React, {useState} from "react"
import  { AiFillCloseCircle } from 'react-icons/ai'
import Popup from "reactjs-popup";
import TeamAddNewWorking from "./TeamAddNewWorking";


function TeamProgressList({started,setStarted,removeTodoFromProg,newWorker}) {

    return (
        <div>
            {started.map((todo,index)=>{
                return(
                    <div key = {index} class="task">
                        
                        <div key={todo.id} > 
                        <button style={{border:"none"}}>
                            {todo.title} {todo.date}
                            <br/>
                            Currently Working: 
                            <br/>
                            <TeamAddNewWorking/>

                        </button>
                            
                            
                        </div>

                        <AiFillCloseCircle 
                            onClick={()=>removeTodoFromProg(todo)}
                        />
                            
                        
                    </div>
                    
                )
            })}
        </div>
    )
}

export default TeamProgressList