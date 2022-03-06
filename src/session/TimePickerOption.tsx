import { SocketSingleton } from "SocketSingleton";
import { secondsToMinutes } from "utils";

export function TimePickerOption({
  seconds,
}: {
  seconds: number;
}) {
  const socketManager = SocketSingleton.getInstance();

  function onPress() {
    socketManager.sendStart(seconds);
  }

  // const boxStyle = tailwind('p-8 m-1')
  // boxStyle.color = "blue"
  return (
    <div className='w-1/2'>
      <button onClick={onPress}>
        <div className='text-center text-xl'>
          {secondsToMinutes(seconds)}
        </div>
      </button>
    </div>
  );
}

