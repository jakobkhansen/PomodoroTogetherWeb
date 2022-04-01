import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { cookieAge, getDateSeconds, PomodoroState } from "utils";
import { SessionState } from "utils/SessionState";
import { SocketContext } from "utils/SocketContext";
import { PomodoroTimer } from "./PomodoroTimer";
import { SessionSettings } from "./sidebar/SessionSettings";
import { Sidebar } from "./sidebar/Sidebar";
import { TabPanel } from "./sidebar/TabPanel";
import { UserList } from "./sidebar/UserList";
import { TimePicker } from "./TimePicker";

export function Session() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["displayName", "sessionName"]);

  const sessionName = useParams().sessionName || "";
  setCookie("sessionName", sessionName, {
    secure: true,
    path: "/",
    sameSite: "none",
    maxAge: cookieAge
  });

  const displayName = cookie.displayName;

  const [sessionState, setSessionState] = useState<SessionState>();

  const [socket, setSocket, createSocket] = useContext(SocketContext);

  if (!(displayName && sessionName)) {
    navigate("/");
  }

  useEffect(() => {
    if (socket === undefined) {
      createSocket();
      return;
    }

    socket?.on("connect", () => {
      socket.emit("session join", sessionName, displayName);
    });
    socket?.on("session update", (sessionState) => {
      setSessionState({
        ...sessionState,
        clock: {
          ...sessionState.clock,
          timeOffset: getDateSeconds() - sessionState.clock.timestamp,
        },
      });
    });

    return function cleanup() {
      socket?.sendLeave();
    };
  }, [socket]);

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
      <Sidebar>
        <TabPanel index={0}><UserList users={sessionState.users} /></TabPanel>
        <TabPanel index={1}><SessionSettings /></TabPanel>
      </Sidebar>
      {renderIfReady()}
    </div>
  );
}
