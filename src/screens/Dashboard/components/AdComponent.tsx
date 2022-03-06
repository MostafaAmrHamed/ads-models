import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import UpdateAd from "./UpdateAd";
import { Ad } from "../../../types";
import Swal from "sweetalert2";

const AdComponent: React.FC<Ad> = ({ id, from, link, title, to, type }) => {
  const dispatch = useDispatch();
  const { DeleteAd } = bindActionCreators(actionCreators, dispatch);
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
              setUpdate={setUpdate}
              setOption={setOption}
            />
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="text-white bg-mark-1 text-semibold text-lg md:text-xl py-1 px-7 rounded-md"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    DeleteAd(id);
                    Swal.fire(
                      "Deleted!",
                      "Your Ad has been deleted.",
                      "success"
                    );
                  }
                });
              }}
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
