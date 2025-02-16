import { createContext, useContext } from "react";

export const WalletContext = createContext(null);

const WalletProvider = ({ children }) => {
  const contextValue = {};

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export default WalletProvider;
