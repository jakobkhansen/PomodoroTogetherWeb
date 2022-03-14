import { createContext, useState } from "react";
import { SessionSocket } from "SessionSocket";
import { io, Socket } from "socket.io-client";

const BACKEND_URL: string =
  process.env.REACT_APP_BACKEND_URL || "localhost:5000";

type ISocketContext = [
  SessionSocket | undefined,
  React.Dispatch<React.SetStateAction<SessionSocket | undefined>>,
  () => void
];
export const SocketContext = createContext<ISocketContext>([
  undefined,
  () => null,
  () => null,
]);

export const SocketProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<SessionSocket | undefined>();

  const createSocket = () => {
    setSocket(new SessionSocket(io(BACKEND_URL)));
  };

  return (
    <SocketContext.Provider value={[socket, setSocket, createSocket]}>
      {children}
    </SocketContext.Provider>
  );
};
