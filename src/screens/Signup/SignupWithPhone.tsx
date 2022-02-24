import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { SignupUserWithPhone } from "../../types/index";
import { RequestOTP, SignupPhone } from "../../utils";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/types";

const SignupWithPhone = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SignupUserWithPhone>({
    name: "",
    role: "normal",
  });
  const [phone, setPhone] = useState<E164Number | undefined>();
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState(false);
  const [direct, setDirect] = useState(false);
  useEffect(() => {
    direct && navigate("/");
  }, [direct]);
  return (
    <div className="mx-auto flex flex-col items-center mt-5">
      {verify || (
        <>
          <div className="bg-primary-1 p-5 w-[300px] text-text rounded-lg">
            <form
              onSubmit={(e) => {
                SignupPhone(e, phone, setVerify);
              }}
              className=" space-y-5"
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
                <PhoneInput
                  placeholder="Phone Number"
                  value={phone}
                  onChange={setPhone}
                  className="w-full"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-mark-1 text-xl py-1 px-6 rounded-md mt-3 font-semibold"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
          <Link to="/signupEmail">
            <div className="bg-primary-1 w-[300px] flex items-center p-2 rounded-md mt-2 space-x-4 text-text hover:bg-gray-700 transition-all ease-in-out hover:cursor-pointer">
              <MdEmail size={35} />
              <span className=" text-2xl pb-2">Sign up with Email</span>
            </div>
          </Link>
          <div id="recaptcha-container"></div>
        </>
      )}

      {verify && (
        <div className="bg-primary-1 flex flex-col justify-center items-center mt-5 p-5 w-[300px] text-text rounded-lg space-y-4">
          <label className=" text-mark-2 py-2 px-3 rounded-md text-sm">
            We've sent you a verification code to your phone number
            <span className="font-semibold text-mark-1"> {phone}</span>
          </label>
          <input
            type="text"
            className="bg-primary-2 p-2 rounded-lg focus:outline-none w-full"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            required
          />
          <button
            type="button"
            className="text-white bg-mark-2 text-xl py-1 px-6 rounded-md mt-3 w-fit"
            onClick={() => {
              RequestOTP(otp, user, setDirect);
            }}
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupWithPhone;
