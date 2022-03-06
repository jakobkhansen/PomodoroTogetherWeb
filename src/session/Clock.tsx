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
    <div
      className="cursor-pointer flex items-center justify-center w-full text-8xl"
      onClick={() => {
        onPress(state);
      }}
    >
      <div>
        {secondsToTimeString(secondsToDisplay())}
      </div>
    </div>
  );
}
