import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useSelector } from "react-redux";
import { State } from "../../state";
import OutsideClickHandler from "react-outside-click-handler";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { CgMenuGridO } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = useSelector((state: State) => state.user);
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-end md:mr-2 mt-5 gap-5">
      <Link
        to="/"
        className="text-text text-2xl font-medium border-2 border-primary-2 px-3 pb-1 hover:bg-primary-2 rounded-md transition-all ease-in-out"
      >
        Home
      </Link>
      {currentUser.loggedIn ? (
        <>
          {currentUser.role === "admin" && (
            <Link
              to="/dashboard"
              className="bg-primary-2 text-text flex items-center justify-center gap-3 px-3 rounded-md"
            >
              <RiDashboardFill size={25} />
              <span className="text-2xl font-semibold pb-1">Dashboard</span>
            </Link>
          )}
          <OutsideClickHandler
            onOutsideClick={() => {
              setOpen(false);
            }}
          >
            <div className="relative">
              <span
                className="bg-primary-2 text-text flex items-center justify-center gap-2 px-2 py-1 rounded-full cursor-pointer"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <CgMenuGridO size={22} />
                <FaUserCircle size={30} className="text-mark-1" />
              </span>
              {open && (
                <ul className="absolute w-fit bg-[#292C31] text-text text-xl mt-3 right-1 p-2 rounded-md">
                  <li className="text-center font-semibold">
                    {currentUser.name}
                  </li>
                  <li
                    className="flex items-center gap-2 pr-7 pl-2 pb-1 mt-2 hover:bg-primary-2 cursor-pointer select-none rounded-md"
                    onClick={() => {
                      signOut(auth);
                      navigate("/");
                      setOpen(false);
                    }}
                  >
                    <BiLogOut size={22} />
                    <span className="pb-1">Logout</span>
                  </li>
                </ul>
              )}
            </div>
          </OutsideClickHandler>
        </>
      ) : (
        //Guest navabr
        <>
          <Link
            to="/loginEmail"
            className="bg-primary-2 text-text flex items-center justify-center gap-3 px-3 rounded-md"
          >
            <BiLogIn size={25} />
            <span className="text-2xl font-semibold pb-1">Login</span>
          </Link>
          <Link
            to="/signupEmail"
            className="bg-primary-2 text-text flex items-center justify-center gap-3 px-3 rounded-md"
          >
            <AiOutlineUserAdd size={25} />
            <span className="text-2xl font-semibold pb-1">Sign up</span>
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
