import { useGlobalProvider } from "../../context/globalContext";

const LandingPage = () => {
  const { startupList, loading } = useGlobalProvider();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800">
        <h1 className="text-2xl font-bold">🚀 Web3 Startups</h1>
        <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Connect Wallet
        </button>
      </nav>

      {/* Header Section */}
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

      {/* Featured Startups Section */}
      <section className="px-10 py-10">
        <h3 className="text-3xl font-semibold text-center mb-6">
          Featured Startups
        </h3>

        {/* Loading Indicator */}
        {loading ? (
          <p className="text-center text-gray-400">Loading startups...</p>
        ) : startupList.length === 0 ? (
          <p className="text-center text-gray-400">No startups found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {startupList.map((startup) => (
              <div key={startup.$id} className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-2">
                  {startup.startupName}
                </h4>
                <p className="text-gray-400">{startup.startupDescription}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works Section */}
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

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-900">
        <p className="text-gray-400">© 2025 Web3 Startups | Built with ❤️</p>
      </footer>
    </div>
  );
};

export default LandingPage;
