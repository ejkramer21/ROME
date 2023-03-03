import React, {useState} from "react";
import '../css/Profile.css';
import axios from "axios";
import { BsWindowSidebar } from "react-icons/bs";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function EditProfile (){
  const [username, setUser] = useState(localStorage.getItem('userid'))
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [birthday, setBirthday] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [notification, setNotification] = useState("")
  const [count, setCount] = useState(0);
  const [userProfile, setProfile] = useState({});

  const [cbirthday, setcBirthday] = useState("")
  const [cphone, setcPhone] = useState("")
  const [caddress, setcAddress] = useState("")
  const [cnotification, setcNotification] = useState("")
  const [redirect, setRedirect] = useState(false);
  useEffect( () => {
    const username = localStorage.getItem("userid")
    axios.get(`/profile/${username}`)
    .then(res => {
      setProfile(res.data);
      // console.log(setProfile);
    })
  }, []);
  async function handleSubmit(e) {

    
    // console.log("i tried");
    e.preventDefault();
    const username = localStorage.getItem("userid");
    // console.log("phonnumber:")
    // console.log(cphone);
    // axios.put('/editprofile', {username, cbirthday, cphone, caddress, cnotification});
    try {
      axios.post('/editprofile', {
        username,
        cbirthday,
        cphone,
        caddress,
        cnotification
      });
      setRedirect(true);
    } catch (e) {
      alert("Profile Update Failed")
    }
}
if (redirect) {
  return <Navigate to={'/profile'}/>
}
  // const [profile, setProfile] = useState([{
  //   birthday: Date,
  //   phone: String,
  //   address: String,
  //   notification: Boolean,
  // }])
  


 
  // axios.get('/profileName',localStorage.getItem("userid")).then(Response =>{
  //   setName(Response.data);
  // })
  // axios.get('/profileEmail',localStorage.getItem("userid")).then(Response =>{
  //   setEmail(Response.data);
  // })

//   axios.get('/profileBirthday',localStorage.getItem("userid")).then(Response =>{
//     setBirthday(Response.data);
// s  })
//   axios.get('/profilePhone',localStorage.getItem("userid")).then(Response =>{
//     setPhone(Response.data);

//   })
//   axios.get('/profileAddress',localStorage.getItem("userid")).then(Response =>{
//     setAddress(Response.data);

//   })
//   axios.get('/profileNotification',localStorage.getItem("userid")).then(Response =>{
//     setNotification(Response.data);
//   })


  // const handleBirthday = (e) => {
  //   setcBirthday(e.target.value);
  // }
  // const handlePhone = (e) => {
  //   setcPhone(e.target.value);
  // }
  // const handleAddress = (e) => {
  //   setcAddress(e.target.value);
  // }
  // const handleNotification = (e) => {
  //   setcNotification(e.target.value);
  // }

  

 

  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);
  return (
    <div >
      <div class="container">
        <div class="main-body">
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center ">
                    <div class="mt-4">
                      <button class="pic btn-default" type = "submit">
                        <img src="https://play-lh.googleusercontent.com/38AGKCqmbjZ9OuWx4YjssAz3Y0DTWbiM5HB0ove1pNBq_o9mtWfGszjZNxZdwt_vgHo=w240-h480-rw" alt="Logo" width="100" height="100" class="rounded mx-auto d-block center" />      
                      </button>

                      <h1>{userProfile.userFullname}</h1>  
                      <p class="text-secondary mb-1">{userProfile.userEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="card mt-3">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                    <span class="text-secondary">website.com</span>
                  </li>

                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                    <span class="text-secondary">@twitter</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                    <span class="text-secondary">instgram</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                    <span class="text-secondary">facebook</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <form 
                      id="editprofile"
                      onSubmit={handleSubmit}
                  >
                    {/* <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Full Name</h>
                        </div>

                          <div class="col-sm-9 text-secondary">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" />

                          </div>

                      </div>
                      <ColoredLine color="grey" /> */}
                      
                      <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Birthday</h>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          
                        <input
                            id="birthday"
                            type="date"
                            onChange={e => setcBirthday(e.target.value)}
                            value={cbirthday}
                        />                
                        </div>
                      </div>
                      <ColoredLine color="grey" />

                      {/* <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Email</h>
                        </div>
                        <div class="col-sm-9 text-secondary">
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        
                        </div>
                      </div>
                      <ColoredLine color="grey" /> */}


                      <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Preferred name</h>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <textarea
                          id="text"
                          placeholder="Preferred name"
                          onChange={e => setcPhone(e.target.value)}
                          value={cphone}
                      />
                      </div>
                      </div>
                      <ColoredLine color="grey" />

      

                      <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Pronouns</h>
                        </div>
                        <div class="col-sm-9 text-secondary">
                        <textarea
                          id="address"
                          placeholder="Pronous"
                          type="text"
                          className="description-box"
                          onChange={e => setcAddress(e.target.value)}
                          value={caddress}
                      />                
                        </div>
                      </div>
                      <ColoredLine color="grey" />


                        {/* <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Notification</h>
                        
                        </div>
                        
                        <div class="col-sm-9">
                        <label>
                        <input
                          id="notification"
                          type="checkbox"
                          className="description-box"
                          onChange={e => setcNotification(e.target.value)}
                          value={notification}
                      />                                       </label>
                        </div>
                      </div>
                      <ColoredLine color="grey" />                   */}
                      <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Email Notification</h>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          
                        </div>
                      </div>
                      <ColoredLine color="grey" />                  <div class="row">
                        <div class="col-sm-3">
                          <h class="mb-0">Theme</h>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          
                        </div>
                      </div>
                      <ColoredLine color="grey" />
                        <div class="row">

                        <div class="col-sm-12">
                          <button class="submit">submit</button>
                      </div>

                    </div>
                  </form>
                </div>
              </div>
            </div>            
          </div>
        </div> 
      </div>
    </div>
  )

}

export default EditProfile;



{/*https://retool.com/blog/building-a-react-navbar/ 
https://codingbeautydev.com/blog/react-get-input-value-on-button-click/*/}