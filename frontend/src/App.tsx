import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Signin, Signup, Dashboard } from "./pages/Extender";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
