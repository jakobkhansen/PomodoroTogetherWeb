import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getDateSeconds, PomodoroState } from "utils";
// import 'dotenv/config'

type SessionState =
  | undefined
  | {
      users: string[];
      clock: {
        timestamp: number;
        timeLeft: number;
        state: PomodoroState;
        timeOffset: number;
      };
    };

export function Session() {
  let location = useLocation();
  const { displayName, sessionName } = location.state as any;
  const BACKEND_URL: string = process.env.REACT_APP_BACKEND_URL || "localhost:5000";
  const [sessionState, setSessionState] = useState<SessionState>();

  console.log(BACKEND_URL)
  console.log(sessionState)


  useEffect(() => {
    const socket = io(BACKEND_URL);
    console.log(socket)
    socket.emit("session join", sessionName, displayName);
    socket.on("session update", (sessionState) => {
      console.log("Hello")
      setSessionState({
        ...sessionState,
        clock: {
          ...sessionState.clock,
          timeOffset: getDateSeconds() - sessionState.clock.timestamp,
        },
      });
    });

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      Session! {displayName} {sessionName}
    </div>
  );
}
