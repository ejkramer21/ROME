import "../css/Calendar.css";
import React, {Component} from 'react';
import CalendarDays from "./CalendarDays";
import AddEvent from "./AddEvent";
import Popup from 'reactjs-popup';



class CalendarTest extends Component {

    constructor() {
        super();

        this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        this.hours =['1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm',
                     '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am']


        this.state = {
          currentDay: new Date(),
          events: [], //grab for database
          show: false
        }
        
    }



    scheduleEventHour = (hour) => {
        const newevent = {
            date: hour.date,
            time: hour.time,
            top: false //only make top kinda need pop up first tho i think
        };
        this.setState({events : [...this.state.events, newevent]})
    }

    scheduleEvent = (newElapsedEvent) => { //Deal with server communication within this fucntion
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
                title: newElapsedEvent.title
            }; 
            elapsedEvent.push(newevent)
        }
        this.setState({events : [...this.state.events, ...elapsedEvent]})
    }
    
    
    changeCurrentDay = (day) => {
        this.setState({ currentDay: new Date(day.year, day.month, day.number) });
    }

    nextWeek = () => {
        this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() + 7)) });
    }
    
    previousWeek = () => {
        this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() - 7)) });
    }

    
    openform = () => {
        this.setState({ show: true });
    };



    closeform = () => {
        this.setState({ show: false });
    }

    render() {
        return (
            <>

                <div class="Calendar-container">

                    <div class="Calendar-header">
                        <div class="header-left">
                        <button type="button" class="btn btn-secondary" onClick={this.previousWeek}>&#60;</button>
                        <button type="button" class="btn btn-secondary" onClick={this.nextWeek}>&#62;</button>
                        </div>
                        <h2 class="Calendar-header-content">{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</h2>
                        <div class="header-right">

                        <Popup class="addevent" trigger={<button type="button" class="btn btn-secondary">Add Events </button>} open={this.state.show}
                        onOpen={this.openform} position="right center" nested modal>
                            <div class="card">
                            <AddEvent  
                                    trigger={this.state.show}
                                    setTrigger={this.closeform}
                                    scheduleEvent={this.scheduleEvent}
                                />     
                            </div>
                        </ Popup>

                        <button type="button" class="btn btn-secondary">Week</button>
                        </div>
                    </div>
                    <div class="Calendar-content-body">
                        <div class="time-sidebar">
                            {
                                this.hours.map((hour) => {
                                    return <div className="hour"><p>{hour}</p></div>
                                })
                            }
                        </div>
                        <div class="Calendar-Content">
                            <div className="calendar-body">
                                <div className="table-header">
                                {
                                    this.weekdays.map((weekday) => {
                                    return <div className="weekday"><p>{weekday}</p></div>
                                    })
                                }
                                </div>
                                <CalendarDays day={this.state.currentDay} changeCurrentDay={this.changeCurrentDay} 
                                            events={this.state.events} scheduleEventHour={this.scheduleEventHour} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
        
    }
        
}

    
export default CalendarTest;