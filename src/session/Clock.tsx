import { useEffect, useState } from "react";
import { getDateSeconds, PomodoroState, secondsToTimeString } from "utils";
import { runningTimerStates } from "./PomodoroTimer";

type ClockProps = {
  timestamp: number;
  timeLeft: number;
  state: PomodoroState;
  timeOffset: number;
  onPress: (state: PomodoroState) => any;
  onFinished: () => any;
};

export function Clock({
  timestamp,
  timeLeft,
  state,
  timeOffset,
  onPress,
  onFinished,
}: ClockProps) {
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    if (runningTimerStates.includes(state)) {
      const id = setInterval(() => {
        setSecondsPassed((prevSec) => prevSec + 1);
      }, 1000);

      return () => clearInterval(id);
    }
  }, [timestamp, timeLeft, state]);

  function secondsToDisplay(): number {
    const display = Math.floor(
      timeLeft - (getDateSeconds() - timeOffset - timestamp)
    );

    if (display < 0) {
      onFinished();
    }
    return display;
  }

  return (
    <div className="flex items-center justify-center w-full ">
      {runningTimerStates.includes(state) && (
        <div
          className="cursor-pointer text-8xl dark:text-gray-300"
          onClick={() => {
            onPress(state);
          }}
        >
          {secondsToTimeString(secondsToDisplay())}
        </div>
      )}
      {!runningTimerStates.includes(state) && (
        <div
          className="cursor-pointer text-8xl text-gray-500 dark:text-gray-500"
          onClick={() => {
            onPress(state);
          }}
        >
          {secondsToTimeString(secondsToDisplay())}
        </div>
      )}
    </div>
  );
}
