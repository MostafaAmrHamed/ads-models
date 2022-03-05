import React, { useState } from "react";
import AdComponent from "./components/AdComponent";
import CreateAd from "./components/CreateAd";

const Dashboard = () => {
  const [createAd, setCreateAd] = useState(false);
  return (
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
        <AdComponent />
        <AdComponent />
        <AdComponent />
        <AdComponent />
        {/* <h1 className="text-3xl font-semibold text-subtext">
          The screen ads is empty!
        </h1> */}
      </div>
    </div>
  );
};

export default Dashboard;
