import { useState } from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800">
        <h1 className="text-2xl font-bold">🚀 Web3 Startups</h1>
        <button
        //   onClick={connectWallet}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {/* {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"} */}
        </button>
      </nav>

      <header className="text-center py-20">
        <h2 className="text-4xl font-bold mb-4">
          Connecting Startups & Investors with Web3
        </h2>
        <p className="text-gray-400">
          Discover innovative startups and fund the future using blockchain.
        </p>
        <button className="mt-6 bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition">
          Explore Startups
        </button>
      </header>

      <section className="px-10 py-10">
        <h3 className="text-3xl font-semibold text-center mb-6">
          Featured Startups
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h4 className="text-xl font-semibold">TechNova</h4>
            <p className="text-gray-400">
              AI-powered SaaS for business automation.
            </p>
            <button className="mt-4 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
              View Details
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-800">
        <h3 className="text-3xl font-semibold text-center mb-6">
          How It Works
        </h3>
        <div className="flex justify-center gap-10">
          <div className="text-center">
            <h4 className="text-xl font-bold">1️⃣ Connect Wallet</h4>
            <p className="text-gray-400">Use MetaMask to connect.</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold">2️⃣ Explore Startups</h4>
            <p className="text-gray-400">Find startups to invest in.</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold">3️⃣ Invest Securely</h4>
            <p className="text-gray-400">Invest via smart contracts.</p>
          </div>
        </div>
      </section>

      <footer className="text-center py-6 bg-gray-900">
        <p className="text-gray-400">© 2025 Web3 Startups | Built with ❤️</p>
      </footer>
    </div>
  );
};

export default LandingPage;
