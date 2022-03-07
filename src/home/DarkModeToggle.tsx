import React, { useEffect, useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import { ThemeContext } from "utils/ThemeContext";

export default () => {
  const [ theme, setTheme ] = React.useContext(ThemeContext);
  console.log(theme)

  return (
    <DarkModeToggle className="absolute right-4" onChange={(val) => setTheme(val && 'dark' || 'light') } checked={theme === 'dark'} size={80} />
  );
};
