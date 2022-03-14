import DarkModeToggle from "home/DarkModeToggle";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { SessionSocket } from "SessionSocket";
import { getDateSeconds, PomodoroState } from "utils";
import { SocketContext } from "utils/SocketContext";
import { ThemeContext } from "utils/ThemeContext";
import { PomodoroTimer } from "./PomodoroTimer";
import { Sidebar } from "./Sidebar";
import { TimePicker } from "./TimePicker";
import { SessionState } from "utils/SessionState";
// import 'dotenv/config'

export function Session() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(['displayName', 'sessionName'])

  const sessionName = useParams().sessionName || ""
  setCookie('sessionName', sessionName, {secure: true, path : "/", sameSite:'none'})

  const displayName = cookie.displayName

  const [sessionState, setSessionState] = useState<SessionState>();

  const [socket, setSocket] = useContext(SocketContext)

  console.log(socket)


  if (!(displayName && sessionName)) {
    navigate("/");
  }


  useEffect(() => {
    if (socket === undefined) {
      return
    }

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
      socket.sendLeave()
    };

  }, [])


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
            <PomodoroTimer clock={sessionState?.clock}></PomodoroTimer>
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
