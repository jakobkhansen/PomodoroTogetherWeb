import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DarkModeToggle from "react-dark-mode-toggle";
import { ThemeContext } from "utils/ThemeContext";

export default () => {
  const [ theme, setTheme ] = React.useContext(ThemeContext);

  function onChange(val : boolean) {
    setTheme(val && 'dark' || 'light')
  }

  return (
    <DarkModeToggle className="absolute bottom-4 right-4" onChange={onChange} checked={theme === 'dark'} size={80} />
  );
};
