import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing Page";
import GlobalProvider from "./context/globalContext";
import RegisterStartupOwner from "./pages/Authentication/RegisterStartupOwner";
import RegisterInvestor from "./pages/Authentication/RegisterInvestor";
<<<<<<< HEAD
import Dashboard from "./pages/user/Dashboard/index";
import MyStartups from "./pages/user/My Startup/index";
import AddNewStartup from "./pages/user/My Startup/Add-New-Startup/index";
import Profile from "./pages/user/Profile/index";
import InvestorDashboard from "./pages/investor/Dashboard";
=======
import Dashboard from "./pages/Dashboard/index";
import MyStartups from "./pages/My Startup/index";
import AddNewStartup from "./pages/My Startup/Add-New-Startup/index";
import Profile from "./pages/Profile/index";
import StartupDetail from "./pages/StartupDetail/index";
>>>>>>> main

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
          <Route
            path="/startup-owner/add-new-startup"
            element={<AddNewStartup />}
          />
          <Route path="/startup-owner/profile" element={<Profile />} />
<<<<<<< HEAD
          <Route path="/investor/dashboard" element={<InvestorDashboard />} />
=======
          <Route path="/startup" element={<StartupDetail />} />
>>>>>>> main
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
