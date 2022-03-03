import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import ResetPassword from "./screens/Login/components/ResetPassword";
import LoginWithEmail from "./screens/Login/LoginWithEmail";
import LoginWithPhone from "./screens/Login/LoginWithPhone";
import Navbar from "./screens/Navbar/Navbar";
import SignupWithEmail from "./screens/Signup/SignupWithEmail";
import SignupWithPhone from "./screens/Signup/SignupWithPhone";

function App() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signupEmail" element={<SignupWithEmail />} />
        <Route path="/signupPhone" element={<SignupWithPhone />} />
        <Route path="/loginEmail" element={<LoginWithEmail />} />
        <Route path="/loginPhone" element={<LoginWithPhone />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
