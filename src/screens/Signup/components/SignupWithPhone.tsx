import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { MdEmail } from "react-icons/md";
import { SignupUserWithPhone } from "../../../types/index";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/types";

const generateRecaptha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("generateRecaptha");
        console.log(response);
      },
    },
    auth
  );
};

const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  user: SignupUserWithPhone,
  phone: E164Number | undefined
) => {
  e.preventDefault();
  generateRecaptha();
  let appVerifier = window.recaptchaVerifier;
  const tempPhone = phone ? phone.toString() : "";
  signInWithPhoneNumber(auth, tempPhone, appVerifier)
    .then((confirmationResult) => {
      const otp = prompt("please enter the OTP", " ");
      console.log("OTP: " + otp);
      confirmationResult
        .confirm(`${otp}`)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          console.log("Error confirmation: ");
          console.log(error);
        });
    })
    .catch((error) => {
      // Error; SMS not sent
      console.log("Error Signin: ");
      console.log(error);
    });
};

const SignupWithPhone = () => {
  const [user, setUser] = useState<SignupUserWithPhone>({
    name: "",
    role: "normal",
  });
  const [phone, setPhone] = useState<E164Number | undefined>();
  return (
    <div className=" mx-auto">
      <div className="bg-primary-1 p-5 w-[300px] text-text rounded-lg">
        <form
          onSubmit={(e) => {
            // SignupPhone(e, user);
            handleSubmit(e, user, phone);
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
            <label className="text-2xl"> Phone </label>
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
              className="text-white bg-mark-1 text-xl py-1 px-6 rounded-md mt-3"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
      <div className="bg-primary-1 flex items-center p-2 rounded-md mt-2 space-x-4 text-text hover:bg-gray-700 transition-all ease-in-out hover:cursor-pointer">
        <MdEmail size={35} />
        <span className=" text-2xl pb-2">Sign up with Email</span>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignupWithPhone;
