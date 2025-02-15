import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing Page";
import GlobalProvider from "./context/globalContext";
import RegisterStartupOwner from "./pages/Authentication/RegisterStartupOwner";
import RegisterInvestor from "./pages/Authentication/RegisterInvestor";
import Dashboard from "./pages/Dashboard/index";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/register/startup-owner"
            element={<RegisterStartupOwner />}
          />
          <Route path="/register/investor" element={<RegisterInvestor />} />
          <Route path="/startup-owner/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
