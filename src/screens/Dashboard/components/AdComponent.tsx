import React, { useState } from "react";
import UpdateAd from "./UpdateAd";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { ad } from "../../../types";
const adData: ad = {
  id: 1,
  title: "Nike Football",
  type: "video",
  from: "2022-08-05 6:30 AM",
  to: "2022-07-05 7:00 PM",
  link: "https://asdhjasdasmas.jpg",
};
const AdComponent = () => {
  const [option, setOption] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <div className="ml-2 pb-2 border-b-[1px] border-text space-y-2">
      <ul
        className="md:grid md:grid-cols-12 md:gap-2 items-center hover:bg-primary-2 p-2 cursor-default"
        onClick={() => {
          setOption(!option);
        }}
      >
        <li className="col-span-3">
          <span className="md:hidden font-semibold text-subtext">Title: </span>
          Nike: Just Do It.
        </li>
        <li>
          <span className="md:hidden font-semibold text-subtext">Type: </span>
          Image
        </li>
        <li className="col-span-3">
          <span className="md:hidden font-semibold text-subtext">From: </span>
          2/23/2022 6:25 PM
        </li>
        <li className="col-span-4">
          <span className="md:hidden font-semibold text-subtext">To: </span>
          2/23/2022 7:25 PM
        </li>
        <li>
          {option ? (
            <IoMdArrowDropup size={25} />
          ) : (
            <IoMdArrowDropdown size={25} />
          )}
        </li>
      </ul>

      {option && (
        <>
          {update && (
            <UpdateAd
              id={adData.id}
              title={adData.title}
              type={adData.type}
              from={adData.from}
              to={adData.to}
              link={adData.link}
            />
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="text-white bg-mark-1 text-semibold text-lg md:text-xl py-1 px-7 rounded-md"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                setUpdate(!update);
              }}
              className="text-white bg-mark-2 text-semibold text-lg md:text-xl py-1 px-7 rounded-md"
            >
              Update
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdComponent;
