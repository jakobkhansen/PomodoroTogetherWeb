import { List, ListItem, ListItemText, Switch } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "utils/ThemeContext";

export function UserSettings() {

  const [ theme, setTheme ] = useContext(ThemeContext);

  function onChange(val : boolean) {
    setTheme(val && 'dark' || 'light')
  }

  function darkModeToggle(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    setTheme(checked && 'dark' || 'light')
  }

  return (
    <List>
      <ListItem>
        <ListItemText primary="Dark Mode" />
        <Switch edge="end" checked={theme === 'dark'} onChange={darkModeToggle} />
      </ListItem>
    </List>
  );
}
