import React from "react";

const LoginWithEmail = () => {
  return (
    <div className="bg-primary-1 mx-auto p-5 w-[300px] text-text rounded-lg">
      <form action="" className=" space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <label className="text-2xl"> Name </label>
          <input
            type="text"
            className="bg-primary-2 p-2 rounded-lg focus:outline-none w-full"
          />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <label className="text-2xl"> Email </label>
          <input
            type="email"
            className="bg-primary-2 p-2 rounded-lg focus:outline-none w-full"
          />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <label className="text-2xl"> Password </label>
          <input
            type="password"
            className="bg-primary-2 p-2 rounded-lg focus:outline-none w-full"
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
  );
};

export default LoginWithEmail;
