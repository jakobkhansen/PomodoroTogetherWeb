import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "home/Home";
import { Session } from "session/Session";
import { CookiesProvider } from "react-cookie";
import { MyThemeProvider } from "utils/ThemeContext";
import { SocketProvider } from "utils/SocketContext";

function App() {
  return (
    <CookiesProvider>
      <MyThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/session/:sessionName"
                element={
                  <SocketProvider>
                    <Session />
                  </SocketProvider>
                }
              />
            </Routes>
          </BrowserRouter>
      </MyThemeProvider>
    </CookiesProvider>
  );
}

export default App;
