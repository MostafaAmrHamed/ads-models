import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMobileAlt } from "react-icons/fa";
import { LoginUserWithEmail } from "../../types/index";
import { LoginEmail } from "../../utils";

const LoginWithEmail = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<LoginUserWithEmail>({
    email: "",
    password: "",
  });
  const [direct, setDirect] = useState(false);
  useEffect(() => {
    direct && navigate("/");
  }, [direct, navigate]);
  return (
    <div className="mx-auto flex flex-col items-center mt-5">
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
        </form>
      </div>
      <Link to="/loginPhone">
        <div className="bg-primary-1 w-[300px] flex items-center p-2 rounded-md mt-2 space-x-4 text-text hover:bg-gray-700 transition-all ease-in-out hover:cursor-pointer">
          <FaMobileAlt size={35} />
          <span className=" text-2xl pb-2">Login with phone</span>
        </div>
      </Link>
    </div>
  );
};

export default LoginWithEmail;
