import { Button, List, ListItem } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "utils/SocketContext";

type SessionSettingsProps = {
  stopTimer: () => void | void;
};

export function SessionSettings() {
  const [socket] = useContext(SocketContext);
  const navigate = useNavigate();

  function stopTimer() {
    socket?.sendStop();
  }

  function leaveSession() {
    navigate("/");
  }

  return (
    <List>
      <ListItem alignItems="center">
        <Button onClick={stopTimer}>Stop timer</Button>
      </ListItem>
      <ListItem alignItems="center">
        <Button onClick={leaveSession}>Leave session</Button>
      </ListItem>
    </List>
  );
}
