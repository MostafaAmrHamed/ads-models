import React, { useState } from "react";
import { passwordReset } from "../../../utils";
function ResetPassword() {
  const [email, setEmail] = useState("");
  return (
    <div className="mx-auto flex flex-col items-center text-center mt-5">
      <div className="bg-primary-1 p-5 w-[300px] text-text rounded-lg">
        <label className="text-2xl"> Email </label>
        <input
          type="email"
          className="bg-primary-2 p-2 mt-2 rounded-lg focus:outline-none w-full"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <button
          type="button"
          className="text-white bg-mark-1 text-xl py-1 px-6 rounded-md mt-3"
          onClick={() => {
            passwordReset(email);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
