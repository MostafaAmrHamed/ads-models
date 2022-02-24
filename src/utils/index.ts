import { auth, db } from "../firebase-config";
import { E164Number } from "libphonenumber-js/types";

import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { SignupUserWithEmail, SignupUserWithPhone } from "../types/index";

/*Start of Signup */
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: any;
    recaptchaWidgetId: any;
    grecaptcha: any;
  }
}

//Signup with email
export const SignupEmail = async (
  e: React.FormEvent<HTMLFormElement>,
  user: SignupUserWithEmail
) => {
  e.preventDefault();
  await createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in
      const currentUser = userCredential.user;
      setDoc(doc(db, "users", currentUser.uid), {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: "",
      });
      console.log(user);
    })
    .catch((error) => {
      alert(error);
    });
};

//Signup with phone
const generateRecaptha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response: any) => {},
    },
    auth
  );
};

export const SignupPhone = (
  e: React.FormEvent<HTMLFormElement>,
  phone: E164Number | undefined,
  setVerify: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  generateRecaptha();
  let appVerifier = window.recaptchaVerifier;
  const tempPhone = phone ? phone.toString() : "";
  signInWithPhoneNumber(auth, tempPhone, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setVerify(true);
    })
    .catch((error) => {
      // Error; SMS not sent
      console.log(error);
    });
};

export const requestOTP = (otp: string, user: SignupUserWithPhone) => {
  window.confirmationResult
    .confirm(otp)
    .then((result: any) => {
      const currentUser = result.user;
      setDoc(doc(db, "users", currentUser.uid), {
        name: user.name,
        email: "",
        phone: currentUser.phoneNumber,
        role: user.role,
      });
      console.log(currentUser);
    })
    .catch((error: any) => {
      // User couldn't sign in (bad verification code?)
      console.log(error);
    });
};
/*End of Signup */
