import './App.css';


import { BrowserRouter, Route, Routes } from 'react-router-dom';

//components
import TodoList from './components/jsx/Todo/TodoList';
import ResetPassword from './components/jsx/ResetPassword';
import ForgotPassword from './components/jsx/ForgotPassword';
import Layout from './components/jsx/Layout';
import Welcome from './components/jsx/Welcome';
import Login from './components/jsx/Login';
import Signup from './components/jsx/Signup';
import Calendar from './components/jsx/Calendar';
import CalendarTest from './components/jsx/CalendarTest';
import Profile from './components/jsx/Profile';
import EditProfile from './components/jsx/EditProfile';
import MainPage from './components/jsx/MainPage';
import DefaultLayout from './components/jsx/DefaultLayout';
import axios from 'axios';
import AddEvent from './components/jsx/AddEvent';
import { useState } from 'react';

import TeamHome from './components/jsx/TeamHome';
import { UserContextProvider } from './components/jsx/UserContext';



axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;
//TODO delete below
//import Todo from "./components/jsx/Todo/TodoTest"



function App() {

  const [show,setShow] = useState(false);
  return (
    <div className="App">
      {/* <TodoList /> */}


      
      { /* Used to route thorugh pages add any adition pages here} */ }
      <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Route>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/editprofile" element={<EditProfile />} />
            <Route path="/main" element={<MainPage />} />
            {/* <Route path="/calendar" element={<CalendarTest />} /> */}
            <Route path="/todo" element={<TodoList />} />
            <Route path="/add" element={<AddEvent  />} />
            <Route path='/team/:teamID' element={<TeamHome />}/>

          </Route>



        </Routes>
        </UserContextProvider>
      </BrowserRouter>

      {/* <Todo /> */}

      {/* <TodoList /> */}
    </div>
  );
}

export default App;
