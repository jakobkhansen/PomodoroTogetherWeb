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
      <button onClick={onPress}>
        <div className="w-32 h-32 m-2 flex text-center text-3xl bg-gray-200">
          <div className="m-auto">
          {secondsToMinutes(seconds)}
          </div>
        </div>
      </button>
    </div>
  );
}
