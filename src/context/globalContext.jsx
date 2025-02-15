import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [startupList, setStartupList] = useState([]);

  // Function to add a startup
  const addStartup = (startup) => {
    setStartupList((prev) => [...prev, startup]);
  };

  // Function to remove a startup
  const removeStartup = (startupId) => {
    setStartupList((prev) =>
      prev.filter((startup) => startup.id !== startupId)
    );
  };

  const contextValue = {
    startupList,
    addStartup,
    removeStartup,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook for consuming context
export const useGlobalProvider = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalProvider must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
