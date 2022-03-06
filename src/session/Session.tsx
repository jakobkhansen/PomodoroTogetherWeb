import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { SocketSingleton } from "SocketSingleton";
import { getDateSeconds, PomodoroState } from "utils";
import { PomodoroTimer } from "./PomodoroTimer";
import { TimePicker } from "./TimePicker";
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
  const location = useLocation();
  const navigate = useNavigate();
  const { displayName, sessionName } = location.state as any;
  const BACKEND_URL: string =
    process.env.REACT_APP_BACKEND_URL || "localhost:5000";
  const [sessionState, setSessionState] = useState<SessionState>();
  let socket: Socket;

  if (!(displayName && sessionName)) {
    navigate("/");
  }

  useEffect(() => {
    const socket = new SocketSingleton(io(BACKEND_URL));

    socket.emit("session join", sessionName, displayName);
    socket.on("session update", (sessionState) => {
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

  function renderIfReady(): React.ReactElement {
    if (sessionState?.clock.state == PomodoroState.DONE) {
      return <TimePicker />;
    } else if (sessionState) {
      return (
        <div className="h-full flex-1 justify-evenly">
          <div className="flex-1 justify-center">
            <PomodoroTimer {...sessionState?.clock}></PomodoroTimer>
          </div>
          {/* <UserList users={sessionState.users} />*/}
        </div>
      );
    }

    return <div>Loading...</div>;
  }

  console.log(sessionState);
  return renderIfReady();
}
