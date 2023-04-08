import React from "react";
import "../css/TeamPop.css";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamHome from "./TeamHome"
import { GithubPicker } from "react-color";
axios.defaults.baseURL = 'http://localhost:8000';

function TeamPop(props) {
    const [team, setTeam] = useState("")
    const { user } = useContext(UserContext);
    const [description, setDescription] = useState("")
    const [color, setColor] = useState("")
    const [data, setData] = useState({
        team: {team},
        description: {description},
        // color: {color}
    })

    // async function contSubmit(e) {
    //     console.log("USER TEAM LIST GRABED");
    //     console.log(e.userTeamList);
    //     try {
    //         await axios.post('/teamsubmit',{
    //           teamID: e.teamID,
    //           team: team,
    //           description: description,
    //           username: e.username,
    //           color: color,
    //           members: e.members,
    //           userTeamList: e.userTeamList
    //         });
    //         alert("Team Successfully Created.");
    //       } catch (e){
    //         alert('Team Creation Failed. Please try again later.')
    //       }
    //     props.onSubmit({
    //         teamID: e.teamID,
    //         team: team,
    //         description: description
    //     });
    //     props.setTrigger(false);
    //     setTeam("");
    //     setDescription("");
    // }

    async function handleSubmit(e) {
        e.preventDefault();
        const username = user.userUserName;
        const teamID = Math.floor(Math.random()*10000);
        const members = [username];
        const userTeamList = [team];
        // try {
        //     await axios.get(`/getUser/${username}`)
        //     .then(res => {
        //         const userInfo = res.data;
        //         console.log("USER INFO GRABED");
        //         console.log(res.data);
        //         userTeamList = [...userInfo.userTeamList, team];
        //         contSubmit({
        //             username: username,
        //             teamID: teamID,
        //             members: members,
        //             userTeamList: userTeamList
        //         })
        //     })
        // } catch (e) {
        //     alert('Team Creation Failed. User Not Found')
        // }
        try {
            await axios.post('/teamsubmit',{
              teamID: teamID,
              team: team,
              description: description,
              username: username,
              color: color,
              members: members,
              userTeamList: userTeamList
            });
            alert("Team Successfully Created.");
          } catch (e){
            alert('Team Creation Failed. Please try again later.')
          }
        props.onSubmit({
            teamID: teamID,
            team: team,
            description: description
        });
        props.setTrigger(false);
        setTeam("");
        setDescription("");
    }

    const handleTeam = (e) => {
        setTeam(e.target.value);
        // console.log(team);
        const newdata = {...data}
        newdata[e.target.id]=e.target.value
        setData(newdata)
        console.log(newdata)
    }

    // const handleColor = (e) => {
    //     setColor(e.target.value);
    //     console.log(color);
    //     const newdata = {...data}
    //     newdata[e.target.id]=e.target.value
    //     setData(newdata)
    //     console.log(newdata)
    // }

    const handleDescription = (e) => {
        setDescription(e.target.value);
        console.log(description);
        const newdata = {...data}
        newdata[e.target.id]=e.target.value
        setData(newdata)
        console.log(newdata)
    }

    const openTeamPage = e => {
        return (
            // <BrowserRouter>
            //     <Routes>
            //         <Route path="/team" element={<TeamHome />}/>
            //     </Routes>
            // </BrowserRouter>
            <>
                props.setTrigger(false)
            </>
        )
    }

    return(props.trigger) ? (
        
        <div className="inner-text">
            <div class="card-body">

                <h3>Create New Team</h3>
                <form 
                    id="new-team-form"
                    onSubmit={handleSubmit}
                > 
                    <div class="col-sm-9 text-secondary mt-5">
                        <input
                            id="team"
                            placeholder="Team Name"
                            type="text"
                            onChange={handleTeam}
                            value={team}
                        />
                    </div>
                    <div class="col-sm-9 text-secondary mt-4">
                    
                    <textarea
                        id="description"
                        placeholder="Description"
                        type="text"
                        className="description-box"
                        onChange={handleDescription}
                        value={description}
                    />
                    <GithubPicker 
                        width="13vw"
                         onChange={(color) => {
                            setColor(color.hex);}}
                        value={color}
                     />
                    <button>Submit</button>
                    </div>  
                </form>
                <button className="close" onClick={()=> props.setTrigger(false)}>
                    close
                </button>
                
                {props.children}
            </div>
        </div>


    ) : "";

}

export default TeamPop