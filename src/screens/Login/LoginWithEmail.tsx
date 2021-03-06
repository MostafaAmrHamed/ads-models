import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMobileAlt } from "react-icons/fa";
import { LoginUserWithEmail } from "../../types/index";
import { LoginEmail } from "../../utils";
import { State } from "../../state";
import { useSelector } from "react-redux";

const LoginWithEmail = () => {
  const currentUser = useSelector((state: State) => state.user);
  const navigate = useNavigate();
  const [user, setUser] = useState<LoginUserWithEmail>({
    email: "",
    password: "",
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
          <div className="bg-primary-1 p-2 w-[300px] text-text text-base text-center space-y-1 mb-2 rounded-lg">
            <p className="text-lg border-b-2 border-primary-2 pb-1">
              Login as Admin
            </p>
            <h1>E-mail: Admin@gmail.com</h1>
            <h1>Password: Admin123</h1>
          </div>
          <div className="bg-primary-1 p-5 w-[300px] text-text rounded-lg">
            <form
              onSubmit={(e) => {
                LoginEmail(e, user, setDirect);
              }}
              className=" space-y-4"
            >
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
                  Login
                </button>
              </div>
              <Link to="/resetPassword">
                <p className="text-left text-white mt-3 hover:pl-1 transition-all ease-in-out">
                  Forgot password?
                </p>
              </Link>
            </form>
          </div>
          <Link to="/loginPhone">
            <div className="bg-primary-1 w-[300px] flex items-center p-2 rounded-md mt-2 space-x-4 text-text hover:bg-gray-700 transition-all ease-in-out hover:cursor-pointer">
              <FaMobileAlt size={35} />
              <span className=" text-2xl pb-2">Login with phone</span>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default LoginWithEmail;
