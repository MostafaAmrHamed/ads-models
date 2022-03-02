import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { actionCreators, State } from "../../state";
import { doc, getDoc } from "firebase/firestore";
import { bindActionCreators } from "redux";
import { User } from "../../types";
const Home = () => {
  const dispatch = useDispatch();
  const { loggedIn, loggedOut } = bindActionCreators(actionCreators, dispatch);
  const currentUser = useSelector((state: State) => state.user);
  // const userState = auth.currentUser ? true : false;
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          let userX: User = {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            role: userData.role,
            loggedIn: true,
          };
          loggedIn(userX);
        } else {
          loggedOut(false);
        }
      } else {
        // User is signed out
        loggedOut(false);
      }
    });
  }, [auth.currentUser]);

  return (
    <div className="mx-auto bg-primary-1 w-fit mt-5 p-5 text-text text-2xl rounded-md">
      <h1 className="text-mark-1">Hello, {currentUser.name}</h1>
      <h1>Role: {currentUser.role}</h1>
      <Link to="/loginEmail" className="text-blue-800 underline text-lg">
        Login
      </Link>
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        {" "}
        Logout{" "}
      </button>
    </div>
  );
};

export default Home;
