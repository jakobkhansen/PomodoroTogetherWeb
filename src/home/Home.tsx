import header from "resources/5834.png";
import { ThemeProvider } from "utils/ThemeContext";
import DarkModeToggle from "./DarkModeToggle";
import { HomeInputForm } from "./HomeInputForm";
import { Socials } from "./Socials";

function Home() {
  document.title = "Pomodoro Together";

  return (
    <div className="h-full overflow-y-scroll bg-white dark:bg-slate-900 duration-300">
      <div className="m-auto text-center max-w-4xl">
        <h1 className="m-auto text-4xl pt-5 mb-5 dark:text-white">
          Pomodoro Together
        </h1>
        <img src={header} className="w-4/5 m-auto" />
        <HomeInputForm />
        <DarkModeToggle />
        <Socials />
      </div>
    </div>
  );
}

export default Home;
