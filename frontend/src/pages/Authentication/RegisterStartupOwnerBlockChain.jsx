import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalProvider } from "../../context/globalContext";

const RegisterStartupOwnerBlockChain = () => {
  const { wallet } = useGlobalProvider();
  const [formData, setFormData] = useState({
    orgName: "",
    orgType: "",
    orgCountry: "",
    orgCity: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Register startup owner
      await wallet.registerStartupOwner(formData);
      console.log("Register startup owner form data:", formData);
    } catch (err) {
      console.error("Register startup owner error:", err);
      setError("Failed to register startup owner. Please try again.");
    }

    setLoading(false);
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-400">
          Register as Startup Owner <br />{" "}
          <span className="text-sm text-white">
            using address <br /> {wallet.address}
          </span>
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-400">Organization Name</label>
            <input
              type="text"
              name="orgName"
              placeholder="Enter organization name"
              value={formData.orgName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-400">Organization Type</label>
            <input
              type="text"
              name="orgType"
              placeholder="Enter organization type"
              value={formData.orgType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-400">Country</label>
            <input
              type="text"
              name="orgCountry"
              placeholder="Enter country"
              value={formData.orgCountry}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-400">City</label>
            <input
              type="text"
              name="orgCity"
              placeholder="Enter city"
              value={formData.orgCity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-bold transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register as Startup Owner"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already an investor?{" "}
          <a
            href="/register/investor"
            className="text-green-400 hover:underline"
          >
            Register as Investor
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterStartupOwnerBlockChain;
