import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalProvider } from "../../../context/globalContext";
import {
  BarChart,
  DollarSign,
  FileText,
  Settings,
  User,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("my-investment");
  const [searchQuery, setSearchQuery] = useState("");

  const { startupList, getMyStartups } = useGlobalProvider();
  const myInvestedStartups = getMyStartups();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await startupOwnerServices.get();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const renderMainContent = () => {
    switch (activeTab) {
      case "my-investment":
        return (
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">My Investments</h3>
              <input
                type="text"
                placeholder="Search investments..."
                className="bg-gray-700 px-4 py-2 rounded-lg w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myInvestedStartups.map((startup) => (
                <div
                  key={startup.$id}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-medium">{startup.name}</h4>
                      <p className="text-sm text-gray-400">
                        {startup.industry}
                      </p>
                    </div>
                    <span className="bg-blue-500 text-xs px-2 py-1 rounded">
                      {startup.stage}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      Investment: ${startup.investmentAmount}
                    </p>
                    <p className="text-sm">Equity: {startup.equity}%</p>
                    <button className="w-full mt-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "all-startups":
        return (
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">All Startups</h3>
              <input
                type="text"
                placeholder="Search startups..."
                className="bg-gray-700 px-4 py-2 rounded-lg w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {startupList.map((startup) => (
                <div
                  key={startup.$id}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-medium">{startup.name}</h4>
                      <p className="text-sm text-gray-400">
                        {startup.industry}
                      </p>
                    </div>
                    <span className="bg-blue-500 text-xs px-2 py-1 rounded">
                      {startup.stage}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">Valuation: ${startup.valuation}M</p>
                    <p className="text-sm">
                      Funding Goal: ${startup.fundingGoal}M
                    </p>
                    <button className="w-full mt-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
                      Invest Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "documents":
        return (
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-6">Legal Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user?.documents?.map((doc) => (
                <div key={doc.name} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-gray-400">{doc.type}</p>
                    </div>
                    <a
                      href={doc.url}
                      download
                      className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="bg-gray-800 p-6 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">Profile Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full bg-gray-700 px-4 py-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full bg-gray-700 px-4 py-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2">Investment Focus</label>
                <select className="w-full bg-gray-700 px-4 py-2 rounded-lg">
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Fintech</option>
                </select>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg">
                Update Profile
              </button>
            </div>
          </div>
        );

      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 h-16 flex items-center justify-between px-6 z-50">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            {isSidebarOpen ? (
              <ChevronsLeft className="w-6 h-6" />
            ) : (
              <ChevronsRight className="w-6 h-6" />
            )}
          </button>
          <span className="text-xl font-bold">Investor Dashboard</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex gap-5">
            <button className="flex items-center space-x-2">
              <User className="w-6 h-6" />
              <span>{user?.name || "Investor"}</span>
            </button>
            <div className="right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left bg-red-500 hover:cursor-pointer hover:bg-red-600 rounded-lg flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed top-16 left-0 h-full bg-gray-800 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0 -translate-x-full"
        } lg:w-64 lg:translate-x-0 z-40`}
      >
        <div className="h-full overflow-y-auto p-4">
          <nav className="space-y-2">
            {[
              { id: "my-investment", name: "My Investments", icon: BarChart },
              { id: "all-startups", name: "All Startups", icon: DollarSign },
              { id: "documents", name: "Documents", icon: FileText },
              { id: "profile", name: "Profile", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <tab.icon className="w-6 h-6" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main
        className={`pt-20 transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-0"
        } p-6`}
      >
        {renderMainContent()}
      </main>
    </div>
  );
};

export default Dashboard;
