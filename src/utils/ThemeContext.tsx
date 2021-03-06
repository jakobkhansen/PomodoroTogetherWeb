import { createTheme, Theme, ThemeProvider } from "@mui/material";
import React, { createContext } from "react";
import { useCookies } from "react-cookie";

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }

  return "light"; // light theme as the default;
};

type IThemeContext = [string, React.Dispatch<React.SetStateAction<string>>];

export const ThemeContext = createContext<IThemeContext>(["light", () => null]);

export const MyThemeProvider = ({ initialTheme, children }: any) => {
  const [theme, setTheme] = React.useState<string>(getInitialTheme);
  const [muiTheme, setMuiTheme] = React.useState<Theme>(
    createTheme({
      palette: {
        mode: theme ? "dark" : "light",
      },
    })
  );

  const rawSetTheme = (rawTheme: string) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);

    localStorage.setItem("color-theme", rawTheme);

    setMuiTheme(
      createTheme({
        palette: {
          mode: isDark ? "dark" : "light",
        },
      })
    );
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  React.useEffect(() => {
    rawSetTheme(theme);
    console.log("creating theme ")
    console.log(theme ? "dark" : "light")
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
