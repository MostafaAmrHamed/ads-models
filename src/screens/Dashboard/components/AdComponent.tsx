import React, { useState } from "react";
import UpdateAd from "./UpdateAd";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Ad } from "../../../types";

const AdComponent: React.FC<Ad> = ({ id, from, link, title, to, type }) => {
  const [option, setOption] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <div className="ml-2 pb-2 border-b-[1px] border-text space-y-2">
      <ul
        className="md:grid md:grid-cols-12 md:gap-2 items-center hover:bg-primary-2 p-2 cursor-default rounded-md"
        onClick={() => {
          setOption(!option);
        }}
      >
        <li className="col-span-3">
          <span className="md:hidden font-semibold text-subtext">Title: </span>
          {title}
        </li>
        <li>
          <span className="md:hidden font-semibold text-subtext">Type: </span>
          {type}
        </li>
        <li className="col-span-3">
          <span className="md:hidden font-semibold text-subtext">From: </span>
          {from}
        </li>
        <li className="col-span-4">
          <span className="md:hidden font-semibold text-subtext">To: </span>
          {to}
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
              id={id}
              title={title}
              type={type}
              from={from}
              to={to}
              link={link}
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
