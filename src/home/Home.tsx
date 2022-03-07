import header from "resources/5834.jpg";
import { ThemeProvider } from "utils/ThemeContext";
import DarkModeToggle from "./DarkModeToggle";
import { HomeInputForm } from "./HomeInputForm";

function Home() {
  return (
    <ThemeProvider>
      <div className="h-screen bg-white dark:bg-gray-700 duration-1000">
      <div className="m-auto text-center max-w-4xl">
        <DarkModeToggle />
          <h1 className="m-auto text-4xl pt-5 mb-5 dark:text-white duration-1000">Pomodoro Together</h1>
        <img src={header} className="w-4/5 m-auto" />
        <HomeInputForm />
      </div>
      </div>
    </ThemeProvider>
  );
}

export default Home;
