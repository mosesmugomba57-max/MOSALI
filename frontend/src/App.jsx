import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./pages/Home/Home";
import { Movies } from "./pages/Movies/Movies";
import { MovieDetails } from "./pages/MovieDetails/MovieDetails";
import { Downloads } from "./pages/Downloads/Downloads";
import { About } from "./pages/About/About";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
