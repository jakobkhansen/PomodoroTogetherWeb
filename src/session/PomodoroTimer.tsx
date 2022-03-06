import { Socket } from "socket.io-client";
import { PomodoroState } from "utils";

type PomodoroTimerProps = {
  timestamp: number;
  timeLeft: number;
  state: PomodoroState;
  timeOffset: number;
};

export function PomodoroTimer({timestamp, timeLeft, timeOffset, state}: PomodoroTimerProps) {
  return <>PomodoroTimer</>
}
