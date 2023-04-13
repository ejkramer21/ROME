import React, { useContext, useEffect } from "react";
import {Outlet, useNavigate} from "react-router-dom";
import '../css/DefaultLayout.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import TeamPop from "./TeamPop"
import Popup from "reactjs-popup";
import axios from "axios";
import { UserContext } from "./UserContext";
import JoinTeamPop from "./JoinTeamPop";
import LeaveTeamPop from "./LeaveTeamPop";
import  { AiFillBell,AiFillCheckCircle,AiOutlineBell,AiFillCloseCircle,AiFillSetting } from 'react-icons/ai'
import Cookies from 'js-cookie';
import InviteResponse from "./InviteResponse";

//import { UserContext } from "./UserContext";

function DefaultLayout () {
    //const user = useContext(UserContext);
    const navigate = useNavigate();
    const [buttonPop, setButtonPop] = useState(false);
    const [joinPop, setJoinPop] = useState(false);
    const [isLoggedIn] = useState(false);
    const [color,setColor] = useState("");
    const {user,setUser} = useContext(UserContext);
    const [inviterName, setInviterName] = useState('');
    const [response, setResponse] = useState(0);
    const [responseTeam, setResponsTeam] = useState("");
    const [isnotif, setIsnotif] = useState(false);
    let username = "";
    try{
        username = user.userUserName;
    }
    catch{
        navigate('/login');
    }
    //const username = user.userUserName;
    const [notif, setNotif] = useState([
        {
            _id: String,
            fromuser: String,
            touser: String,
            description: String,
            type: String,
            teamName: String,
        }
    ]);

    const [teams, setTeams] = useState([{
        teamID: Number,
        team: String,
        description: String
    }])

    useEffect( () => { 
        axios.get(`/teams/${username}`)
        .then (res => {
            const teamsGrabed = res.data;
            setTeams(teamsGrabed);
        })
        axios.get(`/color/${username}`)
        .then (res => {
            setColor(res.data);
        });
        axios.get(`/notifications/${username}`)
        .then (res => {
            setNotif(res.data);
            console.log(res.data);
            if(res.data.length == 0){
                setIsnotif(false);
            }else{
                setIsnotif(true);
            }
        });

    }, [] );

    const newTeamButton = () => {
        setButtonPop(true);
    }

    const joinButton = () => {
        setJoinPop(true);
    }

    const addTeam = (newTeam) => {
        if (!newTeam.team || /^\s*$/.test(newTeam.team)) {
            return;
        }
        const withNew = [newTeam,...teams]
        setTeams(withNew)
    } 
    
    const goWelcome = () => {
        navigate("/Welcome")
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

    async function handleInvite(pro){
        let touser = pro.touser;
        let teamname = pro.teamName;
        let id = pro._id;
            if (pro.type === "Request from " || pro.type === "Invite from ") {
            username = pro.fromuser;
            teamname = pro.teamName;
            await axios.post('/acceptmember', {
                username, teamname
            })
            
        } else if(pro.type === "Invite from ") {
            username = user.userUserName;
        }
        console.log("h/I");
        axios.delete(`/deletenotification/${id}`,{})
        axios.get(`/notifications/${touser}`)
        .then (res => {
            setNotif(res.data);
            if(res.data.length == 0){
                setIsnotif(false);
            }else{
                setIsnotif(true);
            }
        });

      };

      async function handleDecline(pro){
        let touser = pro.touser;
        let id = pro._id;
        axios.delete(`/deletenotification/${id}`,{})


        axios.get(`/notifications/${touser}`)
        .then (res => {
            setNotif(res.data);
            if(res.data.length == 0){
                setIsnotif(false);
            }else{
                setIsnotif(true);
            }
        });

      };


    const handlelogout = async (e) => {
        await axios.post('/logout');
        setUser(null);
        Cookies.remove("token");
        navigate("/Welcome");
      };

    function changeTeam(team) {
        localStorage.setItem('team', team.team)
    };

    return (
        <>

            <nav style={{backgroundColor: color}} class="navbar navbar-light mt-1 rounded">
                <a class="navbar-brand" href="/main">
                    <img src="https://cdn-icons-png.flaticon.com/512/1235/1235814.png" alt="Logo" width="30" height="24" class="pic d-inline-block align-text-top" />
                    Rome
                </a>                   
                <div>  
                    <a class="navbar-brand" href="/messenger"> 
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/sibyl/icon-message-square.png" alt="Logo" width="30" height="24" class="" />
                    </a>
                    <Popup trigger={  <button type="button" class="btn " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {isnotif ? <AiFillBell/> : <AiOutlineBell/> } </button>  } contentStyle={{ width: '300px' } } > 
                        {notif.map((notiff, index)=>{
                            return (       
                                <div key={index}> 
                                    <Popup trigger={<button class="notif"> {notiff.type}  {notiff.fromuser} </button>} nested modal >
                                        <div class="card">
                                            <div class="card-body">
                                                {notiff.type}  {notiff.fromuser}
                                                    <ColoredLine color="grey" />
                                                        <div class="row">
                                                            <div class="col-sm-3">
                                                                <h class="mb-0">Team Name</h>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                                {notiff.teamName}
                                                            </div>
                                                        </div> 
                                                        <ColoredLine color="grey" />
                                                        <div class="row">
                                                            <div class="col-sm-3">
                                                                <h class="mb-0">Description</h>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                                {notiff.description}
                                                            </div>
                                                        </div> 
                                                        <ColoredLine color="grey" />

                                                        <button type="button" class="btn " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=> handleInvite(notiff)}>
                                                            <AiFillCheckCircle/> 
                                                        </button>  
                                                        <button type="button" class="btn " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=> handleDecline(notiff)}>
                                                            <AiFillCloseCircle/>                     
                                                        </button>  
                                                    </div>
                                                </div>
                                               

                                    </Popup>
                                    <button type="button" class="btn " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=> handleInvite(notiff)}>
                                        <AiFillCheckCircle/> 
                                    </button>  
                                    <button type="button" class="btn " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=> handleDecline(notiff)}>
                                        <AiFillCloseCircle/>                     
                                    </button>  
                                    <ColoredLine color="grey" />
                                </ div>
            
                                )
                        })} 



                    
                            
                    </ Popup>

         
                    <a class="navbar-brand" href="/profile"> 
                        <AiFillSetting />
                            {/* <img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="Logo" width="30" height="24" class="" /> */}
                    </a>
                    <a class="navbar-brand" href="/" onClick={handlelogout}> 
                        logout
                    </a>

                </div>


            </nav> 
            <Outlet />
            <div class="sidebar">
            <div>
                {teams.map((team,index)=>{
                    return (
                        <div key={index}>
                            <div key={team.teamID}>
                                    <Link to={`/team/${team.team}`} onClick={()=>changeTeam(team)}>{team.team}</Link>
                                    {/* <button onClick={switchTeam}>{team.team}</button> */}
                            </div>
                        </div>
                    )
                })} 
                <br></br>
                    <div class="add-team">
                        <Popup trigger={<button type="button" class="btn btn-secondary"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png" alt="Logo" width="25" height="30" class="rounded mx-auto d-block center" />  </button>} 
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
                    <Popup trigger={<button type="button" class="btn btn-secondary">  JoinTeam  </button>} 
                        open={joinPop} onOpen={joinButton} position="right center" nested modal >
                        <div class="card">
                            <JoinTeamPop
                                trigger={JoinTeamPop} 
                                setTrigger={setJoinPop}
                                // onSubmit={}
                            />   
                        </div>
                    </ Popup>
                    <Popup trigger={<button type="button" class="btn btn-secondary">  LeaveTeam  </button>} 
                        open={joinPop} onOpen={joinButton} position="right center" nested modal >
                        <div class="card">
                            <LeaveTeamPop
                                trigger={JoinTeamPop} 
                                setTrigger={setJoinPop}
                                // onSubmit={}
                            />   
                        </div>
                    </ Popup>

                <div>


                </div>


            
            </div> 
        </>
    );
};

export default DefaultLayout;