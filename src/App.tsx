import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "home/Home";
import { Session } from "session/Session";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "utils/ThemeContext";
import { SocketProvider } from "utils/SocketContext";

function App() {
  return (
    <CookiesProvider>
      <ThemeProvider>
        <SocketProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/session/:sessionName" element={<Session />} />
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
