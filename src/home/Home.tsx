import header from "resources/5834.jpg";
import { HomeInputForm } from "./HomeInputForm";

function Home() {
  return (
    <div className="m-auto text-center max-w-4xl">
      <h1 className="m-auto text-4xl mt-5 mb-5">Pomodoro Together</h1>
      <img src={header} className="w-4/5 m-auto"/>
      <HomeInputForm />
    </div>
  );
}

export default Home;
