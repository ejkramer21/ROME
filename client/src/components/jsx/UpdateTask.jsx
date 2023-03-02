import React from "react";
import "../css/AddEvent.css";
import { useState } from "react";
import axios from 'axios';
import 'reactjs-popup/dist/index.css';


const UpdateTask = (props) => {
    const [popupOpened, setPopupOpened] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventStartTime, setEventStartTime] = useState("");
    const [eventEndTime, setEventEndTime] = useState("");

    function handleEventSubmit (e) {
        e.preventDefault();
        const newElapsedEvent = { //grab from user with pop up 
            date: new Date(eventDate),
            startTime: parseInt(eventStartTime.substring(0,2)),
            endTime: parseInt(eventEndTime.substring(0,2)),
            title: eventTitle,
            description: eventDescription
        };
        newElapsedEvent.date.setDate(newElapsedEvent.date.getDate() + 1);
        if (newElapsedEvent.startTime > newElapsedEvent.endTime) {
            alert("Enter Valid Times");
        } else {
            props.scheduleEvent(newElapsedEvent);
            props.setTrigger();
        }
    }
    async function handlSubmit(e) {
        e.preventDefault();
        try{
            await axios.post('/Submit', {

            });
            alert("Team Successfully Created.  Redirecting you now.");
          } catch (e){
            alert('Team Creation Failed. Please try again later.')
          }

        props.onSubmit({

        });
        //props.setTrigger(false);

    }
    return (props.trigger) ? (
<>

    <div class="loginpopup">
        <div class="formPopup" id="popupForm">
            
        <h2>Update Task</h2>

        <form autoComplete="off" onSubmit={handleEventSubmit}>
        <div class="row mt-3">
            <div class="col-sm-3">
               <strong>Start Procs.</strong>
            </div>
            <div class="col-sm-3">
                <input 
                type="checkbox" 
                id="eventtitle"  
                onChange={e => setEventTitle(e.target.value)} 
                />

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


export default UpdateTask