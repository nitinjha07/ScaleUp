import { useEffect, useState } from "react";
import { startupOwnerServices } from "../../lib/appwrite/startupOwner.appwrite";
import { useNavigate } from "react-router-dom";
import { useGlobalProvider } from "../../context/globalContext";

const Dashboard = () => {
  const {startupList} = useGlobalProvider();
  const navigate = useNavigate();


  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6">🚀 Startup Owner</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => navigate("/startup-owner/dashboard")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/startups")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                My Startups
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/logout")}
                className="w-full text-left py-2 px-4 bg-red-600 rounded hover:bg-red-500"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={() => navigate("/add-new-startup")}
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            + Add New Startup
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Startups</h3>
            <p className="text-3xl font-bold">10</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Investors Connected</h3>
            <p className="text-3xl font-bold">15</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Funds Raised</h3>
            <p className="text-3xl font-bold">$120K</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Pending Approvals</h3>
            <p className="text-3xl font-bold">3</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">My Startups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
