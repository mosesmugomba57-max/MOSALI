
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Downloads } from "./pages/Downloads/Downloads";
import { About } from "./pages/About/About";
import { MyList } from "./pages/MyList/MyList";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Downloads />} />

                <Route path="/downloads" element={<Downloads />} />

                <Route path="/about" element={<About />} />

                <Route path="/my-list" element={<MyList />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
