import React, { useEffect, useState } from "react";
import AdComponent from "./components/AdComponent";
import CreateAd from "./components/CreateAd";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const ads = useSelector((state: State) => state.ad);
  const user = useSelector((state: State) => state.user);
  const [createAd, setCreateAd] = useState(false);
  useEffect(() => {
    if (user.loggedIn) {
      user.role === "admin" || navigate("/");
    } else {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <>
      {user.role === "admin" && (
        <div className="md:ml-2 xl:mx-auto my-5 space-y-5">
          <button
            className="bg-primary-1 text-text text-3xl py-2 px-5 rounded-md font-semibold hover:bg-primary-2 transition-all ease-in-out"
            onClick={() => {
              setCreateAd(!createAd);
            }}
          >
            {createAd ? <span>Close</span> : <span>Create Ad+</span>}
          </button>
          {createAd && <CreateAd />}
          <div className="bg-primary-1 p-4 text-text rounded-lg space-y-5 md:w-[750px] lg:w-[800px]">
            <h1 className="text-3xl font-semibold">List screen ads</h1>
            <div className="hidden md:block text-subtext text-lg font-semibold ml-2 pb-2 border-b-[1px] border-subtext">
              <ul className="grid grid-cols-12 p-2">
                <li className="col-span-3">Title</li>
                <li>Type</li>
                <li className="col-span-3">From</li>
                <li className="col-span-4">To</li>
              </ul>
            </div>
            {ads.map((ad, index) => {
              return (
                <AdComponent
                  key={index}
                  id={ad.id}
                  title={ad.title}
                  type={ad.type}
                  link={ad.link}
                  from={ad.from}
                  to={ad.to}
                />
              );
            })}
            {ads.length === 0 && (
              <h1 className="text-3xl text-center font-semibold text-subtext p-5">
                No Ads...
              </h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
