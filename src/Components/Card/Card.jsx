import React from "react";
import { motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";
import { FaRegFileAlt, FaRegEdit } from "react-icons/fa";

function Card({ reference, data, onDelete, onEdit }) {
  function tagBgColor() {
    if (data.isCompleted === "Completed") {
      return "bg-green-600";
    } else if (data.isCompleted === "Pending") {
      return "bg-orange-600";
    } else if (data.isCompleted === "Upcoming") {
      return "bg-blue-600";
    } else if (data.isCompleted === "Not Complete") {
      return "bg-red-600";
    }
  }

  return (
    <motion.div
      key={data.id}
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 60 }}
      className="task lg:h-60 h-52 w-44 lg:w-52 bg-[#18181bd1] rounded-3xl cursor-pointer flex flex-col gap-2 overflow-hidden z-10"
    >
      <div className="h-[16%] px-5 pt-5 flex justify-between">
        <FaRegFileAlt className="text-white" />
        <div className="flex gap-2 items-center">
          <button onClick={onEdit}>
            <FaRegEdit className=" text-zinc-200 text-sm hover:text-zinc-400" />
          </button>
          <button onClick={onDelete}>
            <IoIosCloseCircle className="text-zinc-200 text-xl hover:text-zinc-400" />
          </button>
        </div>
      </div>
      <div className="h-[49%] overflow-hidden px-5">
        <p className="text-zinc-300 font-bold text-xs lg:text-sm tracking-wide text-wrap">
          {data.desc}
        </p>
      </div>
      <div className="date px-5 flex justify-between items-center h-[15%]">
        <span className="text-zinc-400 font-bold text-[10px] lg:text-xs">
          {data.date}
        </span>
        <span className="text-zinc-400 font-bold text-[10px] lg:text-xs">
          {data.time}
        </span>
      </div>
      <div
        className={`h-[20%] ${tagBgColor()} flex justify-center items-center`}
      >
        <p className="font-bold text-white tracking-wider">
          {data.isCompleted}
        </p>
      </div>
    </motion.div>
  );
}

export default Card;
