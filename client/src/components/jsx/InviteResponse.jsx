import React from "react";
import "../css/AddEvent.css";
import "../css/DefaultLayout.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';


const InviteResponse = (props) => {
    const [popupOpened, setPopupOpened] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventStartTime, setEventStartTime] = useState("");
    const [eventEndTime, setEventEndTime] = useState("");
    const [eventLabel, setEventLabel] = useState("");
    const [teamName, setTeamName] = useState(props.team);
    const [localTeams, setLocalTeams] = useState([]);
    const [response, setResponse] = useState("");
    // const [teamID, setTeamID] = useState(0);

    // useEffect( () => { 
    //     // console.log("ATTEMPT MADE");
    //     const username = props.username;
    //     axios.get(`/teams/${username}`)
    //     .then (res => {
    //         const teamsGrabed = res.data;
    //         // console.log(teamsGrabed);
    //         setLocalTeams(teamsGrabed);
    //         props.setTeams(teamsGrabed);
    //     });
    //     // console.log(localTeams);
    // }, []);

    async function handleSubmit (e) {
        e.preventDefault();
        const username = localStorage.getItem("userid");
        const teamname = props.notif.teamName;
        try {
            await axios.post('/acceptmember', {
                username,
                teamname
            });
        } catch (e) {
            alert("Failed to join team");
        }
        // const newElapsedEvent = { //grab from user with pop up 
        //     date: new Date(eventDate),
        //     startTime: parseInt(eventStartTime.substring(0,2)),
        //     endTime: parseInt(eventEndTime.substring(0,2)),
        //     title: eventTitle,
        //     description: eventDescription,
        //     teamName: teamName,
        //     teamID: -1,
        //     color: "gray",
        //     type: "user"
        // };
        // newElapsedEvent.date.setDate(newElapsedEvent.date.getDate() + 1);
        // let exists = false;
        // let teamIndex = -1;
        // if (teamName === "Personal" || teamName === "personal") {
        //     exists = true;
        //     newElapsedEvent.color = "#1D9BD1";
        //     newElapsedEvent.teamName = "Personal"
        //     newElapsedEvent.type = "user"
        // } else {
        //     //console.log(teamName);
        //     for (let i = 0; i < props.teams.length; i++) {
        //         //console.log(props.teams[i].team);
        //         if (props.teams[i].team === teamName) {
        //             exists = true;
        //             teamIndex = i;
        //             newElapsedEvent.color = props.teams[i].color;
        //             newElapsedEvent.type = "team"
        //             break;
        //         }
        //     }
        // }
        // if (!exists) {
        //     alert("Team Does Not Exist.")
        // } else if (newElapsedEvent.startTime > newElapsedEvent.endTime) {
        //     alert("Enter Valid Times");
        // } else {
        //     props.scheduleEvent(newElapsedEvent);
        //     props.setTrigger();
        //     const curusername = props.user;
        //     const newDate = newElapsedEvent.date;
        //     const newStartTime = newElapsedEvent.startTime;
        //     const newEndTime = newElapsedEvent.endTime;
        //     const newTitle = newElapsedEvent.title;
        //     const newDescription = newElapsedEvent.description;
        //     if (teamIndex != -1) {
        //         newElapsedEvent.id =  props.teams[teamIndex].teamId;
        //     }
        //     const newTeamName = newElapsedEvent.teamName;
        //     const newTeamID = newElapsedEvent.teamID;
        //     const newColor = newElapsedEvent.color;
        //     const newType = newElapsedEvent.type;
            
        //     try {
        //         await axios.post('/eventsave', {
        //             newDate, 
        //             newStartTime, 
        //             newEndTime, 
        //             newTitle, 
        //             newDescription, 
        //             curusername,
        //             newTeamName,
        //             newTeamID,
        //             newColor,
        //             newType
        //         });
        //         alert('Event Saved');
        //     } catch (e) {
        //         alert('Event Failed to Save');
        //     }
        // } 
    }
    
    return (props.trigger) ? (
<>
    <div class="loginpopup">
        <div class="formPopup" id="popupForm">
        <h2>Invite from</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
            <div class="row mt-3">
                <div class="col-sm-3">
                <strong>Title</strong>
                </div>
                <div class="col-sm-9 text-secondary">
                    {}
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-sm-3">
                <strong>Description</strong>
                </div>
                <div class="col-sm-9 text-secondary">
                    {}
                </div>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="response" 
                class="form-control" 
                id="response"  
                placeholder="Response" 
                value={response} 
                onChange={e => setResponse(e.target.value)} required />
            </div>
            <button type="submit" class="btn">Submit</button>
            </form>
        {/* <h2>Respond To Invite</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Title</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="event" 
                class="form-control" 
                id="eventtitle"  
                placeholder="Title"
                value={eventTitle}
                onChange={e => setEventTitle(e.target.value)} required />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Description</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="description" 
                class="form-control" 
                id="eventdescription"  
                placeholder="Description" 
                value={eventDescription} 
                onChange={e => setEventDescription(e.target.value)} required />
            </div>
        </div> */}
        {/* <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Team</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="lable" 
                class="form-control" 
                id="teamName"  
                placeholder="Team" 
                value={teamName} 
                onChange={e => setTeamName(e.target.value)} required />
            </div>
        </div> */}
        {/* <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Date</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="date" 
                class="form-control" 
                id="eventdate"  
                value={eventDate}
                onChange={e => setEventDate(e.target.value)} required />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Start time</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="time" 
                class="form-control" 
                id="eventstarttime"  
                value={eventStartTime}
                onChange={e => setEventStartTime(e.target.value)} required />
            </div>

        </div>
        <div class="row mt-3">

            <div class="col-sm-3">
               <strong>End time</strong>
            </div>
            <div class="col-sm-9 text-secondary">
                <input 
                type="time" 
                class="form-control" 
                id="eventendtime" 
                value={eventEndTime}
                onChange={e => setEventEndTime(e.target.value)} required />
            </div>
            </div>

            

        <button type="submit" class="btn">Submit</button>
        </form> */}
        <button type="Cancel" class="btn cancel" onClick={()=> props.setTrigger()}>Cancel</button>
        </div>
      </div>

      </>
    ) : "";
}


export default InviteResponse