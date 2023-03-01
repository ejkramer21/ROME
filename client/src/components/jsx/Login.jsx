import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import '../css/Login.css';
import { Navigate } from "react-router-dom";
export default function () {
  const [userUserName,setUserUserName] = useState("");
  const [userPassword,setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const{setUser} = useContext(UserContext);
  async function HandleSubmit (e) {   
    e.preventDefault();
    try{
      const {data} = await axios.post('/login', {userUserName, userPassword});
      setUser(data);
      alert('login succesful. Hi');
      setRedirect(true);
    } catch (e){
      alert("Login Failed");
    }
    
  }
  if(redirect){
    return <Navigate to={'/main'} />
  }
     /* send user input to backend */
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={HandleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="username"
              value={userUserName}
              onChange={e => setUserUserName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={userPassword}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="/forgotpassword">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}