import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./pages/Home/Home";
import { Movies } from "./pages/Movies/Movies";
import { MovieDetails } from "./pages/MovieDetails/MovieDetails";
import { Downloads } from "./pages/Downloads/Downloads";
import { About } from "./pages/About/About";
import { MyList } from "./pages/MyList/MyList";
import { Search } from "./pages/Search/Search";
import { Watch } from "./pages/Watch/Watch";
import { Profile } from "./pages/Profile/Profile";
import { Settings } from "./pages/Settings/Settings";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";

/* Context Providers */
import { AuthProvider } from "./context/AuthContext";
import { MyListProvider } from "./context/MyListContext";
import { ContinueWatchingProvider } from "./context/ContinueWatchingContext";

/* Help pages */
import { FAQ } from "./pages/Help/FAQ";
import { Support } from "./pages/Help/Support";
import { Contact } from "./pages/Help/Contact";
import { Accessibility } from "./pages/Help/Accessibility";

/* Legal pages */
import { Terms } from "./pages/Legal/Terms";
import { Privacy } from "./pages/Legal/Privacy";
import { Cookies } from "./pages/Legal/Cookies";
import { DMCA } from "./pages/Legal/DMCA";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MyListProvider>
          <ContinueWatchingProvider>
            <Navigation />
            <Routes>
              {/* Core Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/watch/:id" element={<Watch />} />
              <Route path="/watch/:seriesId/:season/:episode" element={<Watch />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/about" element={<About />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/search" element={<Search />} />

              {/* User & Auth Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />

              {/* Help Pages */}
              <Route path="/help/faq" element={<FAQ />} />
              <Route path="/help/support" element={<Support />} />
              <Route path="/help/contact" element={<Contact />} />
              <Route path="/help/accessibility" element={<Accessibility />} />

              {/* Legal Pages */}
              <Route path="/legal/terms" element={<Terms />} />
              <Route path="/legal/privacy" element={<Privacy />} />
              <Route path="/legal/cookies" element={<Cookies />} />
              <Route path="/legal/dmca" element={<DMCA />} />
            </Routes>
          </ContinueWatchingProvider>
        </MyListProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
