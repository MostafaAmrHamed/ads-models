import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMobileAlt } from "react-icons/fa";
import { SignupUserWithEmail } from "../../types/index";
import { SignupEmail } from "../../utils";
import { useSelector } from "react-redux";
import { State } from "../../state";
const SignupWithEmail = () => {
  const currentUser = useSelector((state: State) => state.user);
  const navigate = useNavigate();
  const [user, setUser] = useState<SignupUserWithEmail>({
    name: "",
    email: "",
    password: "",
    role: "normal",
  });
  const [direct, setDirect] = useState(false);
  useEffect(() => {
    direct && navigate("/");
    currentUser.loggedIn && navigate("/");
  }, [direct, navigate, currentUser]);

  return (
    <>
      {!currentUser.loggedIn && (
        <div className="mx-auto flex flex-col items-center mt-5">
          <div className="bg-primary-1 p-5 w-[300px] text-text rounded-lg">
            <form
              onSubmit={(e) => {
                SignupEmail(e, user, setDirect);
              }}
              className=" space-y-4"
            >
              <div className="flex flex-col items-center space-y-2">
                <label className="text-2xl"> Name </label>
                <input
                  type="text"
                  className="bg-primary-2 p-2 rounded-lg focus:outline-none w-full"
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <label className="text-2xl"> Email </label>
                <input
                  type="email"
                  className="bg-primary-2 p-2 rounded-lg focus:outline-none w-full"
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <label className="text-2xl"> Password </label>
                <input
                  type="password"
                  className="bg-primary-2 p-2 rounded-lg focus:outline-none w-full"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-mark-1 text-xl py-1 px-6 rounded-md mt-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
          <Link to="/signupPhone">
            <div className="bg-primary-1 w-[300px] flex items-center p-2 rounded-md mt-2 space-x-4 text-text hover:bg-gray-700 transition-all ease-in-out hover:cursor-pointer">
              <FaMobileAlt size={35} />
              <span className=" text-2xl pb-2">Sign up with phone</span>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default SignupWithEmail;
