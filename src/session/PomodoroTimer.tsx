import { useContext } from "react";
import { Socket } from "socket.io-client";
import { SessionSocket } from "SessionSocket";
import { PomodoroState } from "utils";
import { SocketContext } from "utils/SocketContext";
import { Clock } from "./Clock";

type PomodoroTimerProps = {
  timestamp: number;
  timeLeft: number;
  state: PomodoroState;
  timeOffset: number;
};

export function PomodoroTimer({timestamp, timeLeft, timeOffset, state}: PomodoroTimerProps) {
  const [socket, setSocket] = useContext(SocketContext)

  function togglePause(state : PomodoroState) {
    if (runningTimerStates.includes(state)) {
      socket?.sendPause()
    } else { 
      socket?.sendUnpause()
    }
  }

  function stopTimer() {
    socket?.sendStop()
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
