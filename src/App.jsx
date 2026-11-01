
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Downloads } from "./pages/Downloads/Downloads";
import { About } from "./pages/About/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Downloads />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
