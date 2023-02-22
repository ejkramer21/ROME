import React from "react"
import { useState } from "react";
import '../css/Login.css';

export default function (props) {
  const [userUserName,setUserUserName] = useState("");
  const [userPassword,setPassword] = useState("");
  function HandleSubmit (e) { 
    e.preventDefault();
    alert(`Hi ${userUserName}!`);
    /* send user input to backend */
  }
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
            <button type="button" className="btn btn-primary">
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