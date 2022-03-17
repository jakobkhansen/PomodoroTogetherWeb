import { useContext } from "react";
import { SessionSocket } from "SessionSocket";
import { secondsToMinutes } from "utils";
import { SocketContext } from "utils/SocketContext";

export function TimePickerOption({ seconds }: { seconds: number }) {
  const [socket, setSocket] = useContext(SocketContext)

  function onPress() {
    socket?.sendStart(seconds);
  }

  // const boxStyle = tailwind('p-8 m-1')
  // boxStyle.color = "blue"
  return (
    <div>
        <button onClick={onPress} className="h-full w-full p-12 flex text-center text-3xl bg-gray-200 dark:bg-slate-700 rounded-2xl shadow-lg border-slate-300 dark:border-slate-800 border-2">
          <div className="m-auto dark:text-gray-300">{secondsToMinutes(seconds)}</div>
        </button>
    </div>
  );
}
