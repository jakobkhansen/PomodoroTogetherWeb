import { useContext } from "react";
import { AiFillGithub } from "react-icons/ai";
import { ThemeContext } from "utils/ThemeContext";

export function Socials() {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <div className="absolute text-white bottom-4 left-4">
      <a href="https://github.com/jakobkhansen/PomodoroTogetherWeb">
        {theme === 'light' && <AiFillGithub color="#000000" size="2rem" />}
        {theme === 'dark' && <AiFillGithub color="#FFFFFF" size="2rem" />}
      </a>
    </div>
  );
}
