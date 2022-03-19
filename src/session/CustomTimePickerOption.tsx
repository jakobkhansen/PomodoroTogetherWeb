import { useContext, useState } from "react";
import { secondsToMinutes } from "utils";
import { SocketContext } from "utils/SocketContext";

export function CustomTimePickerOption() {
  const [socket, setSocket] = useContext(SocketContext);
  const [minutes, setMinutes] = useState(0);

  function onPress() {
    socket?.sendStart(minutes*60);
  }

  function onChange(event: { target: { value: string } }) {
    const newValue = parseInt(event.target.value) || 0
    setMinutes(newValue);
  }


  return (
    <div className="col-span-full flex py-12 justify-evenly text-center text-2xl bg-gray-200 dark:bg-slate-700 rounded-2xl shadow-lg border-slate-300 dark:border-slate-800 border-2">
      <div className="w-1/2 flex justify-center">
        <div className="font-bold my-auto mx-1 dark:text-gray-300">Custom:</div>
        <input
          onChange={onChange}
          value={minutes || ""}
          className="w-1/3 my-auto mx-2 dark:bg-slate-300 shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <div className="font-bold my-auto dark:text-gray-300">min</div>
      </div>
      <button onClick={onPress} className="bg-white w-1/5 dark:bg-slate-300 my-auto ml-2 shadow appearance-none border rounded py-2 focus:outline-none focus:shadow-outline mr-0">
        Start
      </button>
    </div>
  );
}
