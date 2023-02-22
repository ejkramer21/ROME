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

function App() {
  return (
    <div className="App">
      {/* <TodoList /> */}

      
      { /* Used to route thorugh pages add any adition pages here} */ }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/editprofile" element={<EditProfile />} />
            <Route path="/calendar" element={<CalendarTest />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/main" element={<MainPage />} />

          </Route>
        </Routes>
      </BrowserRouter>

      {/* <TodoList /> */}
    </div>
  );
}

export default App;
