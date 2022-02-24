import React from "react";
import SignupWithEmail from "./components/SignupWithEmail";
import SignupWithPhone from "./components/SignupWithPhone";

const Signup = () => {
  return (
    <div className="container mx-auto">
      <div className="h-[75px] border border-white"> Navbar </div>
      <div className="h-[75vh] flex items-center justify-items-center">
        <SignupWithPhone />
      </div>
    </div>
  );
};

export default Signup;
