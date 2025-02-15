import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing Page";
import GlobalProvider from "./context/globalContext";
import RegisterStartupOwner from "./pages/Authentication/RegisterStartupOwner";
import RegisterInvestor from "./pages/Authentication/RegisterInvestor";
import Dashboard from "./pages/Dashboard/index";
import MyStartups from "./pages/My Startup/index";
import AddNewStartup from "./pages/My Startup/Add-New-Startup/index";
import Profile from "./pages/Profile/index";
import StartupDetail from "./pages/StartupDetail/index";

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
          <Route path="/startup-owner/my-startups" element={<MyStartups />} />
          <Route path="/startup-owner/add-new-startup" element={<AddNewStartup />} />
          <Route path="/startup-owner/profile" element={<Profile />} />
          <Route path="/startup" element={<StartupDetail />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
