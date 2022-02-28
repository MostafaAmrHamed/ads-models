import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { isPhoneExist, LoginRequestOTP, SignupPhone } from "../../utils";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/types";

function LoginWithPhone() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState<E164Number | undefined>();
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState(false);
  const [direct, setDirect] = useState(false);
  useEffect(() => {
    direct && navigate("/");
  }, [direct, navigate]);
  return (
    <div className="mx-auto flex flex-col items-center mt-5">
      {verify || (
        <>
          <div className="bg-primary-1 p-5 w-[300px] text-text rounded-lg">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                const phoneNumber = phone ? phone.toString() : "";
                if (await isPhoneExist(phoneNumber)) {
                  SignupPhone(e, phone, setVerify);
                } else {
                  alert(
                    "Please Signup first with this phone number " + phoneNumber
                  );
                }
                setLoading(false);
              }}
              className=" space-y-5"
            >
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
                  disabled={loading}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <Link to="/loginEmail">
            <div className="bg-primary-1 w-[300px] flex items-center p-2 rounded-md mt-2 space-x-4 text-text hover:bg-gray-700 transition-all ease-in-out hover:cursor-pointer">
              <MdEmail size={35} />
              <span className=" text-2xl pb-2">Login with Email</span>
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
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await LoginRequestOTP(otp, setDirect);
              setLoading(false);
            }}
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginWithPhone;
