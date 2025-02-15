import { createContext, useContext, useEffect, useState } from "react";
import { startupDetailsServices } from "../lib/appwrite/startupDetails";

const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [startupList, setStartupList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        const startups = await startupDetailsServices.getAllStartups();
        setStartupList(startups);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  const addStartup = async (startupData) => {
    try {
      const newStartup = await startupDetailsServices.addStartup(startupData);
      setStartupList((prev) => [...prev, newStartup]);
    } catch (err) {
      console.error("Error adding startup:", err);
    }
  };

  const removeStartup = (startupId) => {
    setStartupList((prev) =>
      prev.filter((startup) => startup.$id !== startupId)
    );
  };

  const contextValue = {
    startupList,
    addStartup,
    removeStartup,
    loading,
    error,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalProvider = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalProvider must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
