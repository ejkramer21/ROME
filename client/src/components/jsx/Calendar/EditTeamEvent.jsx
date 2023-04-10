import React from "react";
import "../../css/AddEvent.css";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from 'axios';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';


const EditTeamEvent = (props) => {
    const [popupOpened, setPopupOpened] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventStartTime, setEventStartTime] = useState("");
    const [eventEndTime, setEventEndTime] = useState("");
    const { user } = useContext(UserContext);

    async function handleEventEdit (e) {
        e.preventDefault();
        const newElapsedEvent = { //grab from user with pop up 
            date: new Date(eventDate),
            startTime: parseInt(eventStartTime.substring(0,2)),
            endTime: parseInt(eventEndTime.substring(0,2)),
            title: eventTitle,
            description: eventDescription,
            teamName: props.event,
            teamID: -1,
            color: "gray"
        };
        newElapsedEvent.date.setDate(newElapsedEvent.date.getDate() + 1);
        let exists = false;
        let team = true;
        let eventIndex = -1;
        for(let i = 0; i < props.events.length; i++) {
            if (props.events[i].teamName === 'Personal') {
                team = false;
            } else if (props.events[i].title === newElapsedEvent.title) {
                exists = true;
                newElapsedEvent.color = props.events[i].color;
                newElapsedEvent.teamName = props.events[i].color;
                newElapsedEvent.teamID = props.events[i].teamID;
                eventIndex = i;
                break;
            }
        }
        if (!exists) {
            alert("Event Title Does Not Exist")
        } else if (newElapsedEvent.startTime > newElapsedEvent.endTime) {
            alert("Enter Valid Times");
        } else {
            props.setTrigger();
            props.editEvent(newElapsedEvent);
            const curusername = user.userUserName;
            const newDate = newElapsedEvent.date;
            const newStartTime = newElapsedEvent.startTime;
            const newEndTime = newElapsedEvent.endTime;
            const newTitle = newElapsedEvent.title;
            const newDescription = newElapsedEvent.description;
            const teamName = props.events[eventIndex].teamName;
            const teamID = props.events[eventIndex].teamID;
            const color = props.events[eventIndex].color;
            try {
                await axios.post('/teameventedit', {
                    newDate, 
                    newStartTime, 
                    newEndTime, 
                    newTitle, 
                    newDescription, 
                    curusername,
                    teamName,
                    teamID,
                    color
                });
            } catch (e) {
                alert("Event did not Update")
            }
        } 
    }
    
    return (props.trigger) ? (
<>
    <div class="loginpopup">
        <div class="formPopup" id="popupForm">
        <h2>Edit Team Event</h2>
        <form autoComplete="off" onSubmit={handleEventEdit}>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Existing Title</strong>
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
        </div>
        <div class="row mt-3">
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
        </form>
        <button type="Cancel" class="btn cancel" onClick={()=> props.setTrigger()}>Cancel</button>
        </div>
      </div>

      </>
    ) : "";
}


export default EditTeamEvent