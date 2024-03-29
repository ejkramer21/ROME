import "../../css/Calendar.css";
import React from 'react';
import CalendarDays from "./CalendarDays";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import Popup from 'reactjs-popup';
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import EventFocus from "./EventFocus";
import EventDetails from "./EventDetails";



export default function CalendarFunc (props) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const workWeekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    // const curWeekdays = weekdays;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const hours =['1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm',
                     '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am']
    const [currentDay, setCurrentDay] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [viewMode, setViewMode] = useState(7);
    const [viewModeString, setViewModeString] = useState("Week");
    const [curWeekdays, setCurWeekdays] = useState(weekdays);
    const [teams, setTeams] = useState([]);
    const [focusTeams, setFocusTeams] = useState([]);
    const [color,setColor] = useState("");
    const {user} = useContext(UserContext);
    const [hourDetails, setHourDetails] = useState();
    const [fullEvents, setFullEvents] = useState([]);
    const [fromDetails, setFromDetails] = useState(false);
    const atTeamCal = false;


    useEffect( () => {
        const username = user.userUserName;
        axios.get(`/events/${username}`)
        .then(res => {
            // console.log(res.data)
            const eventsGrabed = res.data;
            // console.log(eventsGrabed.length)
            const elapsedEvent = [];
            for (let i = 0; i < eventsGrabed.length; i++) {
                // console.log(eventsGrabed[i])
                const newElapsedEvent = { 
                    date: new Date(eventsGrabed[i].date),
                    startTime: eventsGrabed[i].startTime,
                    endTime: eventsGrabed[i].endTime,
                    title: eventsGrabed[i].title,
                    description: eventsGrabed[i].description,
                    teamName: eventsGrabed[i].teamName,
                    teamID: eventsGrabed[i].teamID,
                    color: eventsGrabed[i]. color,
                    type: eventsGrabed[i].type
                };
                // console.log(newElapsedEvent);
                if (newElapsedEvent.endTime === 1) {
                    newElapsedEvent.endTime = 25;
                }
                for (let i = newElapsedEvent.startTime; i < newElapsedEvent.endTime; i++) {
                    let topHour = false;
                    if (i === newElapsedEvent.startTime) {
                        topHour = true;
                    }
                    const newevent = {
                        date: newElapsedEvent.date,
                        time: i,
                        top: topHour,
                        title: newElapsedEvent.title,
                        color: newElapsedEvent.color,
                        teamName: newElapsedEvent.teamName,
                        type: newElapsedEvent.type
                    }; 
                    elapsedEvent.push(newevent)
                }
            }
            setEvents([...events, ...elapsedEvent])
            setFullEvents(eventsGrabed);
        });
        axios.get(`/color/${username}`)
        .then (res => {
            setColor(res.data);
        })
        axios.get(`/getUser/${username}`)
        .then(res => {
            let userProfile = res.data;
            // console.log(userProfile.userViewMode);
            let userViewMode = userProfile.userViewMode;
            // console.log(userViewMode);
            userProfile = null;
            if (userViewMode == 5) {
                setViewMode(5);
                setViewModeString("Work Week");
                setCurWeekdays(workWeekdays);
            } else {
                setViewMode(7);
                setViewModeString("Week");
                setCurWeekdays(weekdays);
            }
        });
        axios.get(`/teams/${username}`)
        .then (res => {
            const teamsGrabed = res.data;
            setTeams(teamsGrabed);
        });
      }, [] )

    const grabTeams = () => {
        const username = user.userUserName;
        axios.get(`/teams/${username}`)
        .then (res => {
            const teamsGrabed = res.data;
            setTeams(teamsGrabed);
        });
    }
 

    const removeEvents = (newElapsedEvent) => {
        const arr = [...events]; // make a separate copy of the array
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].title === newElapsedEvent.title) {
                arr.splice(i,1);
            }
        }
        setEvents([...arr]);
    }

    
    const scheduleEventHour = (hour) => {
        const newevent = {
            date: hour.date,
            time: hour.time,
            top: false
        };
        setEvents([...events, newevent])
    }

    const editEvent = (newElapsedEvent) => {
        //removeEvents(newElapsedEvent);
        const elapsedEvent = [];
        if (newElapsedEvent.endTime === 1) {
            newElapsedEvent.endTime = 25;
        }
        for (let i = newElapsedEvent.startTime; i < newElapsedEvent.endTime; i++) {
            let topHour = false;
            if (i === newElapsedEvent.startTime) {
                topHour = true;
            }
            const newevent = {
                date: newElapsedEvent.date,
                time: i,
                top: topHour,
                title: newElapsedEvent.title,
                color: newElapsedEvent.color,
                teamName: newElapsedEvent.teamName,
                type: newElapsedEvent.type
            }; 
            elapsedEvent.push(newevent)
        }
        const updatedEvents = [];
        for (let i = 0; i < events.length; i++) {
            if (events[i].title !== newElapsedEvent.title) {
                updatedEvents.push(events[i])
            }
        }
        setEvents([...updatedEvents, ...elapsedEvent])
    }

    const scheduleEvent = (newElapsedEvent) => {
        const elapsedEvent = [];
        if (newElapsedEvent.endTime === 1) {
            newElapsedEvent.endTime = 25;
        }
        for (let i = newElapsedEvent.startTime; i < newElapsedEvent.endTime; i++) {
            let topHour = false;
            if (i === newElapsedEvent.startTime) {
                topHour = true;
            }
            const newevent = {
                date: newElapsedEvent.date,
                time: i,
                top: topHour,
                title: newElapsedEvent.title,
                color: newElapsedEvent.color,
                teamName: newElapsedEvent.teamName,
                type: newElapsedEvent.type
            }; 
            elapsedEvent.push(newevent)
        }
        setEvents([...events, ...elapsedEvent])
    }

    async function changeViewMode () {
        const username = user.userUserName;
        let tempViewMode = 7;
        if (viewMode === 7) {
            setViewMode(5);
            setViewModeString("Work Week");
            setCurWeekdays(workWeekdays);
            tempViewMode = 5;
            try {
                await axios.post('/saveViewMode', {
                    username,
                    tempViewMode
                })
                // console.log(username);
                // console.log(tempViewMode);
                // alert("Viewmode Saved");
            } catch (e) {
                alert('ViewMode Failed to Save');
            }
        } else if (viewMode === 5) {
            setViewMode(7);
            setViewModeString("Week");
            setCurWeekdays(weekdays);
            tempViewMode = 7;
            try {
                await axios.post('/saveViewMode', {
                    username,
                    tempViewMode
                })
                // console.log(username);
                // console.log(tempViewMode);
                // alert("Viewmode Saved");
            } catch (e) {
                alert('ViewMode Failed to Save');
            }
        }
        
    }
    
    
    const changeCurrentDay = (day) => {
        setCurrentDay(new Date(day.year, day.month, day.number));
    }

    const nextWeek = () => {
        setCurrentDay(new Date(currentDay.setDate(currentDay.getDate() + 7)));
    }
    
    const previousWeek = () => {
        setCurrentDay(new Date(currentDay.setDate(currentDay.getDate() - 7)));
    }

    
    const openform = () => {
        setShow(true);
    };

    const closeform = () => {
        setShow(false);
    }

    const openEditform = () => {
        setShowEdit(true);
    };

    const closeEditform = () => {
        setShowEdit(false);
        setFromDetails(false);
    }

    const openDetails = (hour) => {
        // console.log(hour.name);
        // console.log(fullEvents);
        let tempEvent;
        for (let i = 0; i < fullEvents.length; i++) {
            if (hour.name === fullEvents[i].title) {
                tempEvent = fullEvents[i];
                break;
            }
        }
        setHourDetails(tempEvent);
        setShowDetails(true);
    };

    const closeDetails = () => {
        setShowDetails(false);
    }

    const handleFocus = (teamSelected) => {
        setFocusTeams(teamSelected);
    }

    const editFromDetails = (eventDet) => {
        if (eventDet.type != "team") {
            setFromDetails(true);
            closeDetails();
            openEditform();
        } else {
            alert("You can not edit team events.")
        }
    }
    
    return (
        <>

            <div class="Calendar-container">

                <div style={{backgroundColor: color}}  class="Calendar-header">
                    <div class="header-left">
                    <button type="button" class="btn btn-secondary" onClick={previousWeek}>&#60;</button>
                    <button type="button" class="btn btn-secondary" onClick={nextWeek}>&#62;</button>
                    </div>
                    <h2 class="Calendar-header-content">{months[currentDay.getMonth()]} {currentDay.getFullYear()}</h2>
                    <div class="header-right">

                    <Popup class="addevent" trigger={<button type="button" class="btn btn-secondary" onClick={grabTeams}>Add Events</button>} open={show}
                    onOpen={openform} position="right center" nested modal>
                        <div class="card">
                        <AddEvent  
                                trigger={show}
                                setTrigger={closeform}
                                scheduleEvent={scheduleEvent}
                                teams={teams}
                                setTeams={setTeams}
                                team={"personal"}
                                user={user.userUserName}
                            />     
                        </div>
                    </ Popup>

                    <Popup class="editevent" trigger={<button type="button" class="btn btn-secondary">Edit Event</button>} open={showEdit}
                    onClose={closeEditform} onOpen={openEditform} position="right center" nested modal>
                        <div class="card">
                        <EditEvent  
                                trigger={showEdit}
                                setTrigger={closeEditform}
                                editEvent={editEvent}
                                events={events}
                                teams={teams}
                                team={"personal"}
                                user={user.userUserName}
                                eventDetails={hourDetails}
                                setEventDetails={setHourDetails}
                                fromDetails={fromDetails}
                                setFromDetails={setFromDetails}
                            />     
                        </div>
                    </ Popup>

                    <button type="button" class="btn btn-secondary" onClick={changeViewMode}>View</button>
                    </div>
                </div>
                <div class="Calendar-content-body">
                    <div class ="event-focus">
                        <EventFocus 
                            teams = {teams}
                            handleFocus={handleFocus}
                            personalColor={color}
                        />
                    </div>
                    <div class="time-sidebar">
                        {
                            hours.map((hour) => {
                                return <div className="hour"><p>{hour}</p></div>
                            })
                        }
                    </div>
                    <div class="Calendar-Content">
                        <div className="calendar-body">
                            <div className="table-header">
                            {
                                curWeekdays.map((weekday) => {
                                return <div className="weekday"><p>{weekday}</p></div>
                                })
                            }
                            </div>
                            <CalendarDays 
                                day={currentDay} 
                                changeCurrentDay={changeCurrentDay} 
                                events={events} 
                                scheduleEventHour={scheduleEventHour} 
                                viewMode={viewMode}
                                focusTeams={focusTeams}
                                openEditform={openEditform}
                                openDetails={openDetails}
                                personalColor={color}
                            />
                            <Popup open={showDetails} onClose={closeDetails}> 
                                <EventDetails  
                                    trigger={showDetails}
                                    setTrigger={closeDetails}
                                    editEvent={editEvent}
                                    events={events}
                                    teams={teams}
                                    team={"personal"}
                                    user={user.userUserName}
                                    eventDetails={hourDetails}
                                    editFromDetails={editFromDetails}
                                    atTeamCal={atTeamCal}
                                />     
                            </Popup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
        
        
}
