import { useEffect, useState } from "react";
import { getDateSeconds, PomodoroState, secondsToTimeString } from "utils";
import { ClockState } from "utils/ClockState";
import { runningTimerStates } from "./PomodoroTimer";

// Handles displaying and updating timer value
// and timer hotkeys
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

  // Hotkeys
  useEffect(() => {
    function keyHandler(event: KeyboardEvent) {
      if (event.code === "Space") {
        onPress(clock.state);
      }
    }
    document.addEventListener("keydown", keyHandler);

    function cleanup() {
      document.removeEventListener("keydown", keyHandler);
    }

    return cleanup;
  });

  function displayClock(): string {
    if (clock.done()) {
      onFinished();
    }
    return clock.secondsToDisplay();
  }

  if (runningTimerStates.includes(clock.state)) {
    document.title = "Pomodoro: ▶️ " +  displayClock();
  } else {
    document.title = "Pomodoro: ⏸️ " +  displayClock();
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
          {displayClock()}
        </div>
      )}
      {!runningTimerStates.includes(clock.state) && (
        <div
          className="cursor-pointer text-8xl text-gray-500 dark:text-gray-500"
          onClick={() => {
            onPress(clock.state);
          }}
        >
          {displayClock()}
        </div>
      )}
    </div>
  );
}
