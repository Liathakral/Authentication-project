// src/App.js
import './App.css';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/Resetpassword/ResetPassword';
import Signup from './Components/Signup/Signup';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password:token" element={<ResetPassword />} /> {/* Parameterized route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
