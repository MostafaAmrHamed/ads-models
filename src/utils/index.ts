import Swal from "sweetalert2";
import { auth, db } from "../firebase-config";
import { E164Number } from "libphonenumber-js/types";
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  // onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  LoginUserWithEmail,
  SignupUserWithEmail,
  SignupUserWithPhone,
} from "../types/index";

/*Start of alerts*/
const errorAlert = (message: string) => {
  Swal.fire({
    icon: "error",
    title: message,
    confirmButtonText: "Ok",
  });
};
const toastAlert = (message: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: "success",
    title: message,
  });
};
const successAlert = (message: string) => {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: message,
    confirmButtonText: "Ok",
  });
};
export const alertFooter = (message: string, link: string, footer: string) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    footer: `<a href="${link}">${footer}</a>`,
  });
};
/*End of alerts*/

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
  user: SignupUserWithEmail,
  setDirect: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  await createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      const currentUser = userCredential.user;
      setDoc(doc(db, "users", currentUser.uid), {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: "",
      });
      toastAlert("Signed up successfully");
      setDirect(true);
    })
    .catch((error) => {
      errorAlert(error.code);
    });
};

//Signup with phone
const generateRecaptha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      // callback: (response: any) => {},
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
      errorAlert(error.code);
    });
};

export const RequestOTP = (
  otp: string,
  user: SignupUserWithPhone,
  setDirect: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
      setDirect(true);
      toastAlert("Signed up successfully");
    })
    .catch((error: any) => {
      errorAlert(error.code);
    });
};
/*End of Signup */

/*Start of Login */
const getUserDataByID = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const userData = docSnap.data();
    console.log("Document data:", userData);
    // alert(`Hello ${userData.name}`);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
export const isPhoneExist = async (phone: string) => {
  const q = query(collection(db, "users"), where("phone", "==", phone));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};
//Login via email
export const LoginEmail = async (
  e: React.FormEvent<HTMLFormElement>,
  user: LoginUserWithEmail,
  setDirect: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  await signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in
      const currentUser = userCredential.user;
      getUserDataByID(currentUser.uid);
      setDirect(true);
      toastAlert("Signed in successfully");
    })
    .catch((error) => {
      if (error.code === "auth/wrong-password") {
        errorAlert("Wrong Password!");
      } else if (error.code === "auth/user-not-found") {
        errorAlert("The user not found");
      } else {
        errorAlert(error.code);
      }
    });
};
export const passwordReset = (email: string) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      successAlert("Password reset email sent!");
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found")
        errorAlert("No account found with that email address!");
    });
};
//Login via phone number
export const LoginRequestOTP = async (
  otp: string,
  setDirect: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await window.confirmationResult
    .confirm(otp)
    .then((result: any) => {
      const currentUser = result.user;
      getUserDataByID(currentUser.uid);
      setDirect(true);
      toastAlert("Signed up successfully");
    })
    .catch((error: any) => {
      // User couldn't sign in (bad verification code?)
      errorAlert(error.code);
    });
};
// const CheckUserLoggedIn = () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       console.log("The current user ID: " + uid);
//       getUserData(uid);
//     } else {
//       console.log("No user signed in");
//     }
//   });
// };

/*End of Login */
