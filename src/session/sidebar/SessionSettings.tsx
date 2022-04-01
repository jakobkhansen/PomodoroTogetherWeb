import { Button, List, ListItem } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "utils/SocketContext";

type SessionSettingsProps = {
  running : boolean
};

export function SessionSettings({running} : SessionSettingsProps) {

  const [socket] = useContext(SocketContext);
  const navigate = useNavigate();

  function stopTimer() {
    socket?.sendStop();
  }
  function incrementTimer() {
    socket?.sendIncrement(60);
  }
  function decrementTimer() {
    socket?.sendIncrement(-60);
  }

  function leaveSession() {
    navigate("/");
  }
  console.log(running)

  return (
    <List>
      <ListItem sx={{display: !running ? "none" : "inherit"}}>
        <Button onClick={stopTimer}>Stop timer</Button>
      </ListItem>
      <ListItem>
        <Button onClick={leaveSession}>Leave session</Button>
      </ListItem>
      <ListItem sx={{display: !running ? "none" : "inherit"}}>
        <div className="m-auto">
        <Button variant="outlined" onClick={incrementTimer}>+1 min</Button>
        <Button variant="outlined" onClick={decrementTimer}>-1 min</Button>
        </div>
      </ListItem>
    </List>
  );
}
