//import modules like express and mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Team = require('./models/Team.js');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const port = process.env.PORT || 8000;

//app
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10); 
const jwtSecret = "2326a84bd9f67c9b9cb44a25c4e9a988";

app.use(cookieParser());
app.use(express.json());
 app.use(cors({credentials: true, 
     origin: 'http://localhost:3000',
}));

//database

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB CONNECTED'))
.catch(err => console.log('DB CONNECTION ERROR', err));



app.get('/test', (req, res) =>{
    res.json('test ok');
});

//mQ9RV3bH6gdeV29w

//User is user schema/type defined in models
//userDoc is new user created 
//SHREY do not confuse the two
//for signup
app.post('/signup', async (req, res) => {  
    const { userFullname, userEmail, userUserName, userPassword } = req.body;
    try {
      // Check if a user with the given userFullname already exists
      const existingUser = await User.findOne({ userUserName });
      if (existingUser) {
        alert("User already exists.");
        return res.status(409).json({ error: 'User already exists' });
      }
      // If no user exists, create a new user
      const userDoc = await User.create({
        userFullname,
        userEmail,
        userUserName, 
        userPassword: bcrypt.hashSync(userPassword, bcryptSalt),
      });
      const savedUser = await userDoc.save();
      res.status(201).json(savedUser);
    } catch (e) {
      res.status(422).json(e);    
    }
  });




//for team
app.post('/Submit', async (req, res) =>{
    const {team, description} = req.body;
    try {
        const teamDoc = await Team.create({
            team,
            description
        });
        res.json(teamDoc);
    } catch (e) {
        res.status(422).json(e);    
    }

});

//for login
app.post('/login', async (req, res) => {
    const { userUserName, userPassword } = req.body;
    const userDoc = await User.findOne({ userUserName: userUserName });
    console.log(userDoc);
    if (userDoc) {
      const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword);
      
      if (passOk) {
        jwt.sign({username:userDoc.userUserName, 
            id:userDoc._id
        }, jwtSecret, {}, (err, token) =>{
            if(err) throw(err);
            res.cookie('token', token).json(userDoc);
        });

      } else {
        res.status(422).json('password not ok');
      }
    } else {
      res.json('User not found');
    }
  });


//for profile
app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
            if(err) throw err;
            const {userUserName, userEmail, _id} = await User.findById(userData.id);
            res.json({userUserName, userEmail, _id});
        });
    } else{
        res.json(null);
    }
})


//middleware



//listener
const server = app.listen(port, ()=>console.log(`Server is running on ${port}`))

//routes (Note to Team: Requires extra installation from react-router-dom)
