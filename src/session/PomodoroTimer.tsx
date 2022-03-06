import { Socket } from "socket.io-client";
import { SocketSingleton } from "SocketSingleton";
import { PomodoroState } from "utils";
import { Clock } from "./Clock";

type PomodoroTimerProps = {
  timestamp: number;
  timeLeft: number;
  state: PomodoroState;
  timeOffset: number;
};

export function PomodoroTimer({timestamp, timeLeft, timeOffset, state}: PomodoroTimerProps) {
    const socket = SocketSingleton.getInstance()

  function togglePause(state : PomodoroState) {
    if (runningTimerStates.includes(state)) {
      socket.sendPause()
    } else { 
      socket.sendUnpause()
    }
  }

  function stopTimer() {
    socket.sendStop()
  }


  return (
    <div className="fullscreen_flex">
      <Clock onPress={togglePause} onFinished={stopTimer} {...{timestamp, timeLeft, timeOffset, state}}></Clock>
    </div>
  );
}

export const runningTimerStates = [PomodoroState.WORKING, PomodoroState.BREAK];

export const pausedTimerStates = [
  PomodoroState.WORKING_PAUSED,
  PomodoroState.BREAK_PAUSED,
];
