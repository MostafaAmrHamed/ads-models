import React, { useState } from "react";

const CreateAd = () => {
  const [from, setFrom] = useState({
    date: "",
    hour: "",
    minute: "",
    time: "",
  });
  const [to, setTo] = useState({
    date: "",
    hour: "",
    minute: "",
    time: "",
  });
  const [ad, setAd] = useState({
    title: "",
    type: "image",
    link: "",
    from: "",
    to: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAd({
      ...ad,
      from: `${from.date} ${from.hour}:${from.minute} ${from.time}`,
      to: `${to.date} ${to.hour}:${to.minute} ${to.time}`,
    });
    console.log(ad);
    // setAd({ title: "", type: "", link: "", from: "", to: "" });
  };
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
              onChange={(e) => {
                setFrom({ ...from, date: e.target.value });
              }}
            />
            <input
              required
              type="number"
              className="bg-primary-2 text-text p-2 rounded-md w-[70px] focus:outline-none"
              placeholder="hour"
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
              onChange={(e) => {
                setTo({ ...to, date: e.target.value });
              }}
            />
            <input
              required
              type="number"
              className="bg-primary-2 text-text p-2 rounded-md w-[70px] focus:outline-none"
              placeholder="hour"
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
              className="bg-primary-2 p-2 focus:outline-none rounded-md w-full"
              onChange={(e) => {
                setAd({ ...ad, link: e.target.value });
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-4 font-semibold text-white bg-mark-2 rounded-md text-right"
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
