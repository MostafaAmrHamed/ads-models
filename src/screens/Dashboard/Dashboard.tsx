import React, { useState } from "react";
import CreateAd from "./components/CreateAd";

function Dashboard() {
  const [createAd, setCreateAd] = useState(false);
  return (
    <div className="ml-2 xl:mx-auto mt-5 space-y-5">
      <button
        className="bg-primary-1 text-text text-3xl py-2 px-5 rounded-md font-semibold hover:bg-primary-2 transition-all ease-in-out"
        onClick={() => {
          setCreateAd(!createAd);
        }}
      >
        {createAd ? <span>Close</span> : <span>Create Ad+</span>}
      </button>
      {createAd && <CreateAd />}
    </div>
  );
}

export default Dashboard;
