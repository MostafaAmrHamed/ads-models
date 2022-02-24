import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupWithEmail from "./screens/Signup/SignupWithEmail";
import SignupWithPhone from "./screens/Signup/SignupWithPhone";

function App() {
  return (
    <div className="container mx-auto">
      <div className="h-[75px] border border-white"> Navbar </div>
      <Routes>
        <Route path="/signupEmail" element={<SignupWithEmail />} />
        <Route path="/signupPhone" element={<SignupWithPhone />} />
      </Routes>
    </div>
  );
}

export default App;
