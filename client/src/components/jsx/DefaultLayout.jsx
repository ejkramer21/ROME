import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import '../css/DefaultLayout.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import TeamPop from "./TeamPop"
import Popup from "reactjs-popup";

function DefaultLayout () {
    const navigate = useNavigate();
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
    
    const goWelcome = () => {
        navigate("/Welcome")
    }
    return (
        <>
            <nav class="navbar navbar-light bg-primary mt-1 rounded">
                    <a class="navbar-brand" href="/main">
                    <img src="https://cdn-icons-png.flaticon.com/512/1235/1235814.png" alt="Logo" width="30" height="24" class="pic d-inline-block align-text-top" />
                    Rome
                    </a>
                    PAGENAME
                    <a class="navbar-brand" href="/profile"> 
<img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="Logo" width="30" height="24" class="" />
                    </a>
            </nav> 
            <Outlet />
            <div class="sidebar">

            {/* <a href="#bar">                        
                <img src="https://www.hyperakt.com/assets/images/fc-barcelona/_1200x1200_crop_center-center_82_line/Barcelona.jpg" alt="Logo" width="40" height="40" class="rounded mx-auto d-block center" />      
            </a>
            <a href="#real">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png" alt="Logo" width="40" height="40" class="rounded mx-auto d-block center" />      
            </a> */}
                {teams.map((team,index)=>{
                    return (
                        <div key={index}>
                            <div key={team.teamID}>
                                    <Link to={`/team/${team.teamID}`}>{team.team}</Link>
                            </div>
                        </div>
                    )
                })}
                <br></br>
                <div class="add-team">
                    <Popup trigger={<button type="button" class="btn btn-secondary"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png" alt="Logo" width="40" height="40" class="rounded mx-auto d-block center" />  </button>} 
                    open={buttonPop} onOpen={newTeamButton} position="right center" nested modal >
                        <div class="card">
                        <TeamPop 
                            trigger={buttonPop} 
                            setTrigger={setButtonPop}
                            onSubmit={addTeam}
                        />   
                        </div>
                    </ Popup>

                
                </div>

            
            </div> 
        </>
    );
};

export default DefaultLayout;