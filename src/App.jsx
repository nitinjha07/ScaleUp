import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing Page";
import { StartupListProvider } from "./context/startupContext/startupList";

function App() {
  return (
    <StartupListProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/startups" element={<Startups />} />
        <Route path="/add-new-startup" element={<AddStartup />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
    </StartupListProvider>
  );
}

export default App;
