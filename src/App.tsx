import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginWithEmail from "./screens/Login/LoginWithEmail";
import LoginWithPhone from "./screens/Login/LoginWithPhone";
import SignupWithEmail from "./screens/Signup/SignupWithEmail";
import SignupWithPhone from "./screens/Signup/SignupWithPhone";

function App() {
  return (
    <div className="container mx-auto">
      <div className="h-[75px] border border-white text-white"> Navbar </div>
      <Routes>
        <Route path="/signupEmail" element={<SignupWithEmail />} />
        <Route path="/signupPhone" element={<SignupWithPhone />} />
        <Route path="/loginEmail" element={<LoginWithEmail />} />
        <Route path="/loginPhone" element={<LoginWithPhone />} />
      </Routes>
    </div>
  );
}

export default App;
