import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "home/Home";
import { Session } from "session/Session";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<Session />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
