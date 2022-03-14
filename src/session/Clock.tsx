import { useEffect, useState } from "react";
import { getDateSeconds, PomodoroState, secondsToTimeString } from "utils";
import { ClockState } from "utils/ClockState";
import { runningTimerStates } from "./PomodoroTimer";

export function Clock({
  clock,
  onPress,
  onFinished,
}: {
  onPress: (state: PomodoroState) => any;
  onFinished: () => any;
  clock: ClockState;
}) {
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    if (runningTimerStates.includes(clock.state)) {
      const id = setInterval(() => {
        setSecondsPassed((prevSec) => prevSec + 1);
      }, 1000);

      return () => clearInterval(id);
    }
  }, [clock.timestamp, clock.timeLeft, clock.state]);

  function secondsToDisplay(): number {
    const display = Math.floor(
      clock.timeLeft - (getDateSeconds() - clock.timeOffset - clock.timestamp)
    );

    if (display <= 0) {
      onFinished();
    }
    return display;
  }

  if (runningTimerStates.includes(clock.state)) {
    document.title = "Pomodoro: ▶️ " + secondsToTimeString(secondsToDisplay());
  } else {
    document.title = "Pomodoro: ⏸️ " + secondsToTimeString(secondsToDisplay());
  }

  return (
    <div className="flex items-center justify-center w-full ">
      {runningTimerStates.includes(clock.state) && (
        <div
          className="cursor-pointer text-8xl dark:text-gray-300"
          onClick={() => {
            onPress(clock.state);
          }}
        >
          {secondsToTimeString(secondsToDisplay())}
        </div>
      )}
      {!runningTimerStates.includes(clock.state) && (
        <div
          className="cursor-pointer text-8xl text-gray-500 dark:text-gray-500"
          onClick={() => {
            onPress(clock.state);
          }}
        >
          {secondsToTimeString(secondsToDisplay())}
        </div>
      )}
    </div>
  );
}
