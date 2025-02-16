import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startupOwnerServices } from "../../lib/appwrite/startupOwner.appwrite";
import { useGlobalProvider } from "../../context/globalContext";
import RegisterStartupOwnerBlockChain from "./RegisterStartupOwnerBlockChain";

const RegisterStartupOwner = () => {
  const { wallet } = useGlobalProvider();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await startupOwnerServices.get();
        if (user) navigate("/startup-owner/dashboard");
      } catch (err) {
        console.log("No user logged in");
      }
    };
    checkUser();
  }, [navigate]);

  const handleGithubAuth = async () => {
    try {
      await startupOwnerServices.loginStartupOwner();
    } catch (err) {
      console.error("GitHub authentication error:", err);
      setError("GitHub authentication failed. Please try again.");
    }
  };

  return (
    <>
      {!wallet.isRegisteredAsStartupOwner ? (
        <RegisterStartupOwnerBlockChain />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
              Register as Startup Owner
            </h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <button
              onClick={handleGithubAuth} // Updated function call
              className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold flex items-center justify-center space-x-3 transition"
            >
              <span>Continue with GitHub</span>
            </button>

            <p className="text-gray-400 text-center mt-4">
              Want to invest?{" "}
              <a
                href="/register/investor"
                className="text-blue-400 hover:underline"
              >
                Register as Investor
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterStartupOwner;
