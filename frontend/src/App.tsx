import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import {
  Signin,
  Signup,
  Dashboard,
  FastDial,
  ChatApp,
  NotFound,
  Community,
  Incident,
} from "./pages/Extender";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/emergency-services" element={<FastDial />} />
            <Route path="/emergency-chat" element={<ChatApp />} />
            <Route path="/Community" element={<Community />} />
            <Route path="/incidents" element={<Incident />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};
export default App;
