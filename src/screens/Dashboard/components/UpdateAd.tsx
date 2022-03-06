import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { UpdateAd as UpdateAdType } from "../../../types";
import Swal from "sweetalert2";

const splitDate = (date: string) => {
  let split = date.split(" ");
  let splitTime = split[1].split(":");
  let tempDate = {
    date: split[0],
    hour: splitTime[0],
    minute: splitTime[1],
    time: split[2],
  };
  return tempDate;
};

const UpdateAd: React.FC<UpdateAdType> = ({
  id,
  title,
  type,
  from,
  to,
  link,
  setUpdate,
  setOption,
}) => {
  const dispatch = useDispatch();
  const { UpdateAd } = bindActionCreators(actionCreators, dispatch);
  const [fromDate, setFromDate] = useState(splitDate(from));
  const [toDate, setToDate] = useState(splitDate(to));
  const [ad, setAd] = useState({
    id: id,
    title: title,
    type: type,
    link: link,
    from: "",
    to: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UpdateAd(ad);
    setUpdate(false);
    setOption(false);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Saved!",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  useEffect(() => {
    setAd({
      ...ad,
      from: `${fromDate.date} ${fromDate.hour}:${fromDate.minute} ${fromDate.time}`,
      to: `${toDate.date} ${toDate.hour}:${toDate.minute} ${toDate.time}`,
    });
  }, [fromDate, toDate]);
  return (
    <div className="bg-primary-1 text-text text-xl w-fit p-5 rounded-lg">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className=" space-y-4"
      >
        <div className="flex flex-col md:flex-row gap-2">
          <div className="space-y-2">
            <p className="font-semibold pl-1">Title</p>
            <input
              required
              type="text"
              value={ad.title}
              className="bg-primary-2 p-2 focus:outline-none rounded-md"
              onChange={(e) => {
                setAd({ ...ad, title: e.target.value });
              }}
            />
            <div className="space-y-2">
              <p className="font-semibold pl-1">Type</p>
              <select
                required
                value={ad.type}
                onChange={(e) => {
                  setAd({ ...ad, type: e.target.value });
                }}
                className="bg-primary-2 p-2 w-[150px] rounded-md"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>
        </div>

        {/*From DatePicker*/}
        <div className="space-y-2">
          <p className="font-semibold pl-1">From</p>
          <div className="flex flex-col md:flex-row gap-2 text-base">
            <div>
              <input
                required
                type="date"
                defaultValue={fromDate.date}
                className="bg-primary-2 text-text p-2 rounded-md focus:outline-none"
                onChange={(e) => {
                  setFromDate({ ...fromDate, date: e.target.value });
                }}
              />
            </div>
            <div className="flex gap-2">
              <input
                required
                type="number"
                min={1}
                max={12}
                value={fromDate.hour}
                className="bg-primary-2 text-text p-2 rounded-md w-[70px] focus:outline-none"
                placeholder="hour"
                onChange={(e) => {
                  setFromDate({ ...fromDate, hour: e.target.value });
                }}
              />
              <span className="font-semibold text-3xl">:</span>
              <input
                required
                type="number"
                min={0}
                max={59}
                className="bg-primary-2 text-text p-2 rounded-md w-[70px] focus:outline-none"
                value={fromDate.minute}
                placeholder="minute"
                onChange={(e) => {
                  setFromDate({ ...fromDate, minute: e.target.value });
                }}
              />
              <select
                required
                value={fromDate.time}
                onChange={(e) => {
                  setFromDate({ ...fromDate, time: e.target.value });
                }}
                className="bg-primary-2 p-2 rounded-md"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        {/*To DatePicker*/}
        <div className="space-y-2">
          <p className="font-semibold pl-1">To</p>
          <div className="flex flex-col md:flex-row gap-2 text-base">
            <div>
              <input
                required
                type="date"
                defaultValue={toDate.date}
                className="bg-primary-2 text-text p-2 rounded-md focus:outline-none"
                onChange={(e) => {
                  setToDate({ ...toDate, date: e.target.value });
                }}
              />
            </div>
            <div className="flex gap-2">
              <input
                required
                type="number"
                min={1}
                max={12}
                className="bg-primary-2 text-text p-2 rounded-md w-[70px] focus:outline-none"
                value={toDate.hour}
                placeholder="hour"
                onChange={(e) => {
                  setToDate({ ...toDate, hour: e.target.value });
                }}
              />
              <span className="font-semibold text-3xl">:</span>
              <input
                required
                type="number"
                min={0}
                max={59}
                className="bg-primary-2 text-text p-2 rounded-md w-[70px] focus:outline-none"
                value={toDate.minute}
                placeholder="minute"
                onChange={(e) => {
                  setToDate({ ...toDate, minute: e.target.value });
                }}
              />
              <select
                required
                value={toDate.time}
                onChange={(e) => {
                  setToDate({ ...toDate, time: e.target.value });
                }}
                className="bg-primary-2 p-2 rounded-md"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-semibold pl-1">Link</p>
            <input
              required
              type="text"
              value={ad.link}
              className="bg-primary-2 p-2 focus:outline-none rounded-md w-full"
              onChange={(e) => {
                setAd({ ...ad, link: e.target.value });
              }}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="py-1 px-5 font-semibold text-white bg-mark-1 rounded-md text-right"
              onClick={() => {
                Swal.fire({
                  title: "Do you want to save the changes?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Save",
                  denyButtonText: `Don't save`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    UpdateAd(ad);
                    setUpdate(false);
                    setOption(false);
                    Swal.fire("Saved!", "", "success");
                  } else if (result.isDenied) {
                    setUpdate(false);
                    Swal.fire("Changes are not saved", "", "info");
                  }
                });
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-1 px-7 font-semibold text-white bg-mark-2 rounded-md text-right"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateAd;
