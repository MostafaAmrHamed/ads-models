import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { Ad } from "../../../types";
import Swal from "sweetalert2";
const CreateAd = () => {
  const dispatch = useDispatch();
  const { createAd } = bindActionCreators(actionCreators, dispatch);
  const [from, setFrom] = useState({
    date: "",
    hour: "",
    minute: "",
    time: "AM",
  });
  const [to, setTo] = useState({
    date: "",
    hour: "",
    minute: "",
    time: "AM",
  });
  const [ad, setAd] = useState<Ad>({
    id: 0,
    title: "",
    type: "image",
    link: "",
    from: "",
    to: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAd(ad);
    setAd({ id: 2, title: "", type: "image", link: "", from: "", to: "" });
    setFrom({ date: "", hour: "", minute: "", time: "AM" });
    setTo({ date: "", hour: "", minute: "", time: "AM" });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Ad has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  useEffect(() => {
    setAd({
      ...ad,
      from: `${from.date} ${from.hour}:${from.minute} ${from.time}`,
      to: `${to.date} ${to.hour}:${to.minute} ${to.time}`,
    });
  }, [from, to]);

  return (
    <div className="bg-primary-1 text-text text-xl w-fit p-5 rounded-lg">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className=" space-y-4"
      >
        <div className="flex gap-2">
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
          </div>
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

        {/*From DatePicker*/}
        <div className="space-y-2">
          <p className="font-semibold pl-1">From</p>
          <div className="flex gap-2 text-base">
            <input
              required
              type="date"
              className="bg-primary-2 text-text p-2 rounded-md focus:outline-none"
              value={from.date}
              onChange={(e) => {
                setFrom({ ...from, date: e.target.value });
              }}
            />
            <input
              required
              type="number"
              className="bg-primary-2 text-text p-2 rounded-md w-[70px] focus:outline-none"
              placeholder="hour"
              value={from.hour}
              onChange={(e) => {
                setFrom({ ...from, hour: e.target.value });
              }}
            />
            <span className="font-semibold text-3xl">:</span>
            <input
              required
              type="number"
              className="bg-primary-2 text-text p-2 rounded-md w-[70px] focus:outline-none"
              placeholder="minute"
              value={from.minute}
              onChange={(e) => {
                setFrom({ ...from, minute: e.target.value });
              }}
            />
            <select
              required
              value={from.time}
              onChange={(e) => {
                setFrom({ ...from, time: e.target.value });
              }}
              className="bg-primary-2 p-2 rounded-md"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        {/*To DatePicker*/}
        <div className="space-y-2">
          <p className="font-semibold pl-1">TO</p>
          <div className="flex gap-2 text-base">
            <input
              required
              type="date"
              className="bg-primary-2 text-text p-2 rounded-md focus:outline-none"
              value={to.date}
              onChange={(e) => {
                setTo({ ...to, date: e.target.value });
              }}
            />
            <input
              required
              type="number"
              className="bg-primary-2 text-text p-2 rounded-md w-[70px] focus:outline-none"
              placeholder="hour"
              value={to.hour}
              onChange={(e) => {
                setTo({ ...to, hour: e.target.value });
              }}
            />
            <span className="font-semibold text-3xl">:</span>
            <input
              required
              type="number"
              className="bg-primary-2 text-text p-2 rounded-md w-[70px] focus:outline-none"
              placeholder="minute"
              value={to.minute}
              onChange={(e) => {
                setTo({ ...to, minute: e.target.value });
              }}
            />
            <select
              required
              value={to.time}
              onChange={(e) => {
                setTo({ ...to, time: e.target.value });
              }}
              className="bg-primary-2 p-2 rounded-md"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-1 px-7 font-semibold text-white bg-mark-2 rounded-md text-right"
            >
              ADD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAd;
