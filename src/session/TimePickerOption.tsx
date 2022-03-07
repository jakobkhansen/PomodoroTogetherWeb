import { SocketSingleton } from "SocketSingleton";
import { secondsToMinutes } from "utils";

export function TimePickerOption({ seconds }: { seconds: number }) {
  const socketManager = SocketSingleton.getInstance();

  function onPress() {
    socketManager.sendStart(seconds);
  }

  // const boxStyle = tailwind('p-8 m-1')
  // boxStyle.color = "blue"
  return (
    <div>
        <button onClick={onPress} className="w-32 h-32 m-2 flex text-center text-3xl bg-gray-200 dark:bg-slate-700 rounded-2xl shadow-lg border-slate-300 dark:border-slate-800 border-2">
          <div className="m-auto dark:text-gray-300">{secondsToMinutes(seconds)}</div>
        </button>
    </div>
  );
}
