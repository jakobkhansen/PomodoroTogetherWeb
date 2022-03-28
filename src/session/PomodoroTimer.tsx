import { useContext } from "react";
import { Socket } from "socket.io-client";
import { SessionSocket } from "SessionSocket";
import { PomodoroState } from "utils";
import { SocketContext } from "utils/SocketContext";
import { Clock } from "./Clock";
import { ClockState } from "utils/ClockState";
import useSound from "use-sound";
import kalimba from "../resources/kalimba.mp3";

export function PomodoroTimer({ clock }: { clock: ClockState }) {
  const [socket, setSocket] = useContext(SocketContext);
  const [playSound] = useSound(kalimba);

  function togglePause(state: PomodoroState) {
    if (runningTimerStates.includes(state)) {
      console.log(socket);
      socket?.sendPause();
    } else {
      socket?.sendUnpause();
    }
  }

  function stopTimer() {
    playSound();
    socket?.sendStop();
  }

  return (
    <div className="fullscreen_flex">
      <Clock onPress={togglePause} onFinished={stopTimer} clock={clock}></Clock>
    </div>
  );
}

export const runningTimerStates = [PomodoroState.WORKING, PomodoroState.BREAK];

export const pausedTimerStates = [
  PomodoroState.WORKING_PAUSED,
  PomodoroState.BREAK_PAUSED,
];
