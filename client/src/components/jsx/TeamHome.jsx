import TodoList from "./Todo/TodoList"
import "../css/TeamHome.css"
import Popup from "reactjs-popup"
import UpdateTask from "./UpdateTask"
import AddEvent from "./Calendar/AddEvent"
import { useState, useEffect } from "react"
import TeamTodoList from "./TeamTodo/TeamTodoList"
import AddTeamMember from "./AddTeamMember"
import TeamCalendar from "./Calendar/TeamCalendar"
import TeamMemberCalendar from "./Calendar/TeamMemberCalendar"
import axios from "axios";

function TeamHome() {
    const [show, setButtonPop] = useState(false);
    const [addTeam, setAddTeam] = useState(false);
    const [bodyView, setBodyView] = useState(0);
    const [bodyViewName, setBodyViewName] = useState("Todo");
    const [managerBool, setManagerBool] = useState(false);
    const [members, setMembers] = useState([{
        userFullname: String,
        userEmail: String,
        userUserName: String,
    }
    ]);
    
    useEffect(() => {
        const teamname = localStorage.getItem('team');
        const username = localStorage.getItem('userid');
        //console.log(teamname);
        axios.get(`getmanager/${teamname}`)
        .then(res => {
            const manager = res.data;
            const managername = manager.userUserName;
            console.log(managername);
            if (managername === username) {
                setManagerBool(true);
            } else {
                setManagerBool(false);

            }
        })
        axios.get(`members/${teamname}`)
        .then(res => {
            const mem = res.data;
            //console.log(res.data);
            setMembers(mem);
            console.log("HERE");
            
            console.log(mem);
        })
    }, [])
    
    const closeAdd = () => {
        setAddTeam(false);
    }

    const openAdd = () => {
        setAddTeam(true);
    }

    // alert("You are entering as a manager");
    const closeform = () => {
        setButtonPop(false);
    }

    const openform = () => {
        setButtonPop(true);
    }
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );
    
    const changePersonalCalendar = () => {
        setBodyView(3);
        setBodyViewName("Calendar");
    }


    const changeBody = () => {
        if (bodyView == 0 && managerBool) {
            setBodyView(1);
            setBodyViewName("Calendar");
        } else if (managerBool) {
            setBodyView(0);
            setBodyViewName("Todo");
        }
    }

    let teamBody;
    if (bodyView === 0) {
        teamBody = <TeamTodoList />
    } else if (bodyView === 1 && managerBool) {
        teamBody = <TeamCalendar />
        // teamBody = <TeamMemberCalendar />
    } else if (managerBool) {
        teamBody = <TeamMemberCalendar />
    }
    
    return (
        <div >
        <div class="todobefore"> 
            <div className="top bg-primary">
                {/* Current Tasks */}
                <button type="button" class="btn btn-secondary" onClick={changeBody}>{bodyViewName}</button>
                {/* TODO ^^^make only display for managers */}
            </div>
            
            {/* <Popup class="updatetask" trigger={<button type="button" class="btn btn-secondary"> {'>'} </button>} open={show}
                        onOpen={openform} position="right center" nested modal>
                            <div class="card">
                            <UpdateTask
                                    trigger={show}
                                    setTrigger={closeform}
                                />     
                            </div>
            </ Popup> */}
            <div class="team-body">
            {teamBody}
            </div>
            {/* <TeamTodoList /> */}
        </div> 
        {/* <div class="todoprogress"> 
            <div className="top bg-primary">
                In Progress
            </div>


        </div>  */}
        {/* <div class="todocomplete"> 
            <div className="top bg-primary">
                Completed
            </div>

     //opens the popup that is in addteammembers
        </div>  */}
   
        <div class="members">
            <div className="top bg-primary">
                members
                    
                {managerBool ?                 
                <Popup class="addevent" trigger={<button type="button" show={managerBool} class="btn btn-secondary">  </button>} open={addTeam}
                        onOpen={openAdd} position="right center" nested modal>
                            <div class="card">
                            <AddTeamMember 
                                    trigger={AddEvent}
                                    setTrigger={closeAdd}
                                    // scheduleEvent={this.scheduleEvent}
                                />     
                            </div>
                </ Popup>
                  : null}

                
            </div>
            {members.map((member,index)=>{
                    return (
                        <div key={index}>
                                <div class="row mt-2">
                                    <div class="col-sm-3">
                                        <h class="mb-0">{member.userFullname}</h>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {member.userEmail}                  
                                    </div>
                                </div>
                                <ColoredLine color="grey" />
                        </div>
                    )
                })} 



            {/* <div class="col-sm-3 mt-2">
                <h class="mb-0">Name     Email</h>

            </div> */}



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