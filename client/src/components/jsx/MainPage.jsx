import React from "react";
import Todo from "./Todo/PersonalTodo/Todo";
import '../css/MainPage.css'
import Calendar from "./Calendar/Calendar";
import AddEvent from "./Calendar/AddEvent";
import TodoList from "./Todo/PersonalTodo/TodoList";
import CalendarTest from "./Calendar/CalendarTest";
import CalendarFunc from "./Calendar/CalendarFunc"
// import  {useNavigate} from "react-router-dom";
import { useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {Link} from 'react-router-dom'
import PersonalTodo from "./Todo/PersonalTodo.jsx";


function MainPage (){
    // let navigation = useNavigate();
    const [show,setShow] = useState(false);
    const enterTeam = (team, index) => {
        //  console.log(team, index)
         //route to team page localhost:3000/team/{index}/
    }

  return (
    <div >
        <div class="calendar"> 
            <div class="align-center">
             <CalendarFunc /> 

            </div> 
         </div> 
        <div class="todo">
            <PersonalTodo />
        </div>
    </div> 
  )
}

export default MainPage;


{/*https://retool.com/blog/building-a-react-navbar/ */}