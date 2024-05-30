import React, { useEffect, useRef, useState } from "react";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import Card from "../Card/Card";
import { format } from "date-fns";

function Main() {
  let [char, setChar] = useState("");
  let [taskCompleted, usetaskComplete] = useState("Completed");
  const ref = useRef(null);

  let [tasks, useTasks] = useState([]);
  let [id, setId] = useState(0);

  function addTask() {
    if (char.length > 0 && char.length < 100) {
      const newTask = {
        desc: char,
        isCompleted: taskCompleted,
        id: id,
        date: format(new Date(), "dd/MM/yyyy"),
        time: new Date().toLocaleTimeString(),
      };
      setChar("");
      setId((prevID) => prevID + 1);
      const newTasks = [newTask, ...tasks];
      useTasks(newTasks);
      localStorage.setItem("tasksData", JSON.stringify(newTasks));
    } else {
      alert("Must have Enter more than 10 letters and less than 100!!!");
    }
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasksData");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      useTasks(parsedTasks);
      const maxId = parsedTasks.reduce(
        (max, task) => Math.max(max, task.id),
        0
      );
      setId(maxId + 1);
    }
  }, []);

  function deleteCard(id) {
    const upateTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasksData", JSON.stringify(upateTasks));
    useTasks(upateTasks);
  }

  function onEdit(id) {
    const editTasks = tasks.filter((task) => task.id === id);
    console.log(editTasks);
    setChar(editTasks[0].desc);
    usetaskComplete(editTasks[0].isCompleted);
    const upateTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasksData", JSON.stringify(upateTasks));
    useTasks(upateTasks);
  }

  return (
    <>
      <div className="w-screen h-screen bg-zinc-800 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-[16vw] lg:text-[10vw] font-extrabold tracking-wider text-zinc-900">
            To Do
          </h2>
        </div>
        <div className="upperLayer bg-transparent w-screen h-full flex flex-col">
          <div className="header flex justify-center items-center gap-4 lg:gap-3 lg:h-[15%] flex-col lg:flex-row lg:py-0 py-5">
            <div className="inputDiv flex items-center border border-zinc-500 w-[85vw] lg:w-1/3 rounded-full">
              <input
                type="text"
                id="taskInput"
                value={char}
                onChange={(e) => setChar(e.target.value)}
                className="bg-transparent py-2 px-4 text-zinc-200 tracking-wider border-none outline-none flex-1"
                placeholder="Add Your Task..."
              />
              <button
                onClick={() => setChar((char = ""))}
                className={
                  char.length > 0
                    ? "py-2 text-2xl text-zinc-300 px-2"
                    : "text-2xl opacity-0 py-2 px-2"
                }
              >
                <IoIosClose />
              </button>
            </div>
            <div className="flex justify-center gap-2">
              <select
                onChange={(e) => usetaskComplete(e.target.value)}
                className="px-2 py-3 bg-zinc-700 hover:bg-zinc-600 duration-200 rounded-full text-zinc-100 font-semibold outline-none tracking-wider lg:text-[1rem] text-sm"
              >
                <option
                  value="Completed"
                  className="font-semibold tracking-widest"
                >
                  Completed
                </option>
                <option
                  value="Pending"
                  className="font-semibold tracking-widest"
                >
                  Pending
                </option>
                <option
                  value="Upcoming"
                  className="font-semibold tracking-widest"
                >
                  Upcoming
                </option>
                <option
                  value="Not Complete"
                  className="font-semibold tracking-widest"
                >
                  Not Complete
                </option>
              </select>
              <button
                onClick={addTask}
                className="text-4xl p-1 text-zinc-300 hover:bg-zinc-600 duration-200 rounded-full bg-zinc-700"
              >
                <IoIosAdd />
              </button>
            </div>
          </div>

          <div
            ref={ref}
            className="tasks h-[85%] lg:px-6 px-2 flex justify-center gap-4 flex-wrap overflow-scroll"
          >
            {tasks.map((task) => (
              <Card
                reference={ref}
                data={task}
                onDelete={() => deleteCard(task.id)}
                onEdit={() => onEdit(task.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
