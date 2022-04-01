import { Divider, List, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { ThemeContext } from "utils/ThemeContext";

export function UserList({ users }: { users: String[] }): JSX.Element {

  return (
    <div className="dark:text-white text-center">
      <List>
        {users.map((user,i) => (
          <Box key={i}>
            <Divider sx={{}}/>
            <ListItemText sx={{ fontSize: "1em" }}>{user}</ListItemText>
          </Box>
        ))}
      </List>
    </div>
  );
}
