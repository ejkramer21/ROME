import TodoList from "./Todo/TodoList"
import "../css/TeamHome.css"
import Popup from "reactjs-popup"
import UpdateTask from "./UpdateTask"
import AddEvent from "./AddEvent"
import { useState } from "react"
function TeamHome() {
    const [show, setButtonPop] = useState(false);

    const closeform = () => {
        setButtonPop(false);
    }

    const openform = () => {
        setButtonPop(true);
    }
    return (
        <div >
        <div class="todobefore"> 
            <div className="top bg-primary">
                todo1
            </div>
            
            <Popup class="updatetask" trigger={<button type="button" class="btn btn-secondary"> {'>'} </button>} open={show}
                        onOpen={openform} position="right center" nested modal>
                            <div class="card">
                            <UpdateTask
                                    trigger={show}
                                    setTrigger={closeform}
                                />     
                            </div>
            </ Popup>
        </div> 
        <div class="todoprogress"> 
            <div className="top bg-primary">
                todo2
            </div>


        </div> 
        <div class="todocomplete"> 
            <div className="top bg-primary">
                todo3
            </div>


        </div> 
        <div class="members">
            <div className="top bg-primary">
                members
            </div>
        </div>
        <div class="teamchat">
            <div className="top bg-primary">
                chat
            </div>
        </div>
        

    </div> 
        // <div>
        //     <div class="team1"> 
        //         {/* make a different component than TodoList bc this one has some additional functionality
        //         other code can still be used for reference.  It's just easier to make new
        //         for now we just need the spaces for it */}
        //     </div>
        //     <div className="in-progress-container">

        //     </div>
        //     <div className="complete-list">
        //         {/* Note: things here need to be deletable so they don't pile up too much */}
        //     </div>
        //     <div className="announcements">

        //     </div>
        //     <div className="group-chat">

        //     </div>
        // </div>
        //sidebar
        //group todo
        //in progress
        //completed todos
        //team chat area
    )
}

export default TeamHome