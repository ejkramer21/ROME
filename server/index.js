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

app.use(express.json());
app.use(cookieParser());

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
    const {userFullname, userEmail, userUserName, userPassword} = req.body;
    try {
        const userDoc = await User.create({
            userFullname,
            userEmail,
            userUserName, 
            userPassword:bcrypt.hashSync(userPassword, bcryptSalt),
        });
        res.json(userDoc);
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
// app.post('/login', async (req, res) => {
//     const { userUserName, userPassword } = req.body;
//     const userDoc = await User.findOne({ userUserName: userUserName });
//     if (userDoc) {
//       const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword);
//       if (passOk) {
//         jwt.sign({
//             username:userDoc.userUserName, 
//             id:userDoc._id, 
//             email:userDoc.userEmail
//         }, jwtSecret, {}, (err, token) =>{
//             if(err) throw(err);
//             res.cookie('token', token).json(userDoc);
//         });

//       } else {
//         res.status(422).json('pass not ok');
//       }
//     } else {
//       res.json('not found');
//     }
//   });

app.post('/login', async (req, res) => {
    const { userUserName, userPassword } = req.body;
  
    const user = await User.findOne({ userUserName: userUserName });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }
  
    const validPassword = await bcrypt.compare(userPassword, user.userPassword);
    if (!validPassword) {
      return res.status(401).send('Invalid username or password');
    }
  
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    res.cookie('token', token);
    res.json({ success: true });
  });


//for profile

app.get('/profile', async (req, res) => {
    const token = req.cookies.token; // Get the JWT from the 'token' cookie
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userDecode) => {
        if (err) throw err;
        const user = await User.findById(userDecode.id);
        if (user) {
          const { userUserName, userEmail, _id } = user;
          res.json({ userUserName, userEmail, _id });
        } else {
          // Handle the case where the user is not found
          res.status(404).send('User not found');
        }
      });
    } else {
      res.json(null);
    }

});


//middleware



//listener
const server = app.listen(port, ()=>console.log(`Server is running on ${port}`))

//routes (Note to Team: Requires extra installation from react-router-dom)
