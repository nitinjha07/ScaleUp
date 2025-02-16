import { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import { useGlobalProvider } from "../../context/globalContext";
>>>>>>> main

const RegisterInvestor = () => {
  const { wallet } = useGlobalProvider();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
<<<<<<< HEAD
    password: "",
    mobileNumber: "",
    country: "",
    authenticDocument: null,
=======
    phone: "",
    country: "",
    city: "",
    postalCode: "",
>>>>>>> main
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
  const handleFileUpload = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleRegister = async (e) => {
    navigate("/investor/dashboard");
=======
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Register investor
      await wallet.registerInvestor(formData);
      console.log("Register investor form data:", formData);
    } catch (err) {
      console.error("Register investor error:", err);
      setError("Failed to register investor. Please try again.");
    }

    setLoading(false);
>>>>>>> main
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-400">
          Register as Investor <br />{" "}
          <span className="text-sm text-white">
            using address <br /> {wallet.address}
          </span>
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-400">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-gray-400">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-400">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-400">Authentic Document</label>
            <input
              type="file"
              name="authenticDocument"
              onChange={handleFileUpload}
              required
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
=======
            <label className="block text-gray-400">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-400">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-400">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-400">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
>>>>>>> main
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-bold transition disabled:opacity-50"
            onClick={handleRegister}
          >
            {loading ? "Registering..." : "Register as Investor"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Own a startup?{" "}
          <a
            href="/register/startup-owner"
            className="text-green-400 hover:underline"
          >
            Register as Startup Owner
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterInvestor;
