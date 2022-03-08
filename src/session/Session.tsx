import DarkModeToggle from "home/DarkModeToggle";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { SocketSingleton } from "SocketSingleton";
import { getDateSeconds, PomodoroState } from "utils";
import { ThemeContext } from "utils/ThemeContext";
import { PomodoroTimer } from "./PomodoroTimer";
import { Sidebar } from "./Sidebar";
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
  const [cookie, setCookie] = useCookies(['displayName', 'sessionName'])

  const sessionName = useParams().sessionName || ""
  setCookie('sessionName', sessionName, {secure: true, path : "/", sameSite:'none'})

  const displayName = cookie.displayName

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
      return (
        <div id="page-wrap" w-full>
          <TimePicker />;
        </div>
      );
    } else if (sessionState) {
      return (
        <div className="h-full flex-1 justify-evenly" id="page-wrap">
          <div className="flex-1 justify-center">
            <PomodoroTimer {...sessionState?.clock}></PomodoroTimer>
          </div>
        </div>
      );
    }

    return <div>Loading...</div>;
  }
  if (!sessionState || !sessionState.users) {
    return (
      <div className="h-screen dark:bg-slate-900 dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div id="outer-container" className="dark:bg-slate-900 duration-300">
      <Sidebar users={sessionState.users} />
      {renderIfReady()}
    </div>
  );
}
