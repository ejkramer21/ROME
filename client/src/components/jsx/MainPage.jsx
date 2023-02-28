import React from "react";
import Todo from "./Todo/Todo";
import '../css/MainPage.css'
import Calendar from "./Calendar";
import CalendarTest from "./CalendarTest";
// import  {useNavigate} from "react-router-dom";
import TeamPop from "./TeamPop"
import { useState } from "react";


function MainPage (){
    // let navigation = useNavigate();
    const [buttonPop, setButtonPop] = useState(false);
    const [teams, setTeams] = useState([{
        teamID: String,
        team: String,
        descritpion: String
    }])

    const newTeamButton = () => {
        setButtonPop(true);
    }

    const addTeam = (newTeam) => {
        if (!newTeam.team || /^\s*$/.test(newTeam.team)) {
            return;
        }

        const withNew = [newTeam,...teams]
        setTeams(withNew)
        console.log(teams)
    } 

    const enterTeam = (team, index) => {
        //  console.log(team, index)
         //route to team page localhost:3000/team/{index}/
         console.log(team.team,index)
    }

    

  return (
    <div >
        


        <div class="sidebar">

            <a href="#bar">                        
                <img src="https://www.hyperakt.com/assets/images/fc-barcelona/_1200x1200_crop_center-center_82_line/Barcelona.jpg" alt="Logo" width="40" height="40" class="rounded mx-auto d-block center" />      
            </a>
            <a href="#real">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png" alt="Logo" width="40" height="40" class="rounded mx-auto d-block center" />      
            </a>
            {teams.map((team,index)=>{
                return (
                    <div key={index}>
                        <div key={team.teamID}>
                                <a 
                                    href={"team/"+index+"/"}
                                    // onClick={()=>enterTeam(team,index)}
                                    // style={{border: "solid", color:"gray", borderWidth:"1px", width:"100%"}}
                                >
                                    {team.team}
                                </a>
                        </div>
                    </div>
                )
            })}
            <br></br>
            <div class="add-team">
            <button onClick={newTeamButton}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png" alt="Logo" width="40" height="40" class="rounded mx-auto d-block center" />      
            </button>
            <TeamPop 
                trigger={buttonPop} 
                setTrigger={setButtonPop}
                onSubmit={addTeam}
            />
            
            </div>

            
        </div> 



        {/* <div class="calendar">
            <div class="align-center">
              <CalendarTest />
            </div>
        </div> */}

        <div class="todo">
            <p>This will be Todo</p>
  </div>


        

    </div> 

  )

}

export default MainPage;


{/*https://retool.com/blog/building-a-react-navbar/ */}