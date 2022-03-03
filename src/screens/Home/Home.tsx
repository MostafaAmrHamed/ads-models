import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { auth, db } from "../../firebase-config";
import { actionCreators, State } from "../../state";
import { User } from "../../types";

const Home = () => {
  const dispatch = useDispatch();
  const { loggedIn, loggedOut } = bindActionCreators(actionCreators, dispatch);
  const currentUser = useSelector((state: State) => state.user);
  useEffect(() => {
    console.log(auth.currentUser?.email);
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
    </div>
  );
};

export default Home;
