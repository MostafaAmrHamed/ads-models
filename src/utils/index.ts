import { auth, db } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { SignupUserWithEmail, SignupUserWithPhone } from "../types/index";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: any;
  }
}

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
      });
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
};
