import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { startupDetailsServices } from "../lib/appwrite/startupDetails";
import { startupOwnerServices } from "../lib/appwrite/startupOwner.appwrite";
import UsersContract from "../abis/UsersContract.json";
import EscrowContract from "../abis/EscrowContract.json";

const GlobalContext = createContext(null);
const contractConfig = {
  usersContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  escrowContract: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
};
const GlobalProvider = ({ children }) => {
  const [startupList, setStartupList] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // wallet related details
  const [address, setAddress] = useState("");
  const [isRegisteredAsUser, setIsRegisteredAsUser] = useState(false);

  const [isRegisteredAsStartupOwner, setIsRegisteredAsStartupOwner] =
    useState(false);
  const [walletLoading, setWalletLoading] = useState(true);

  useEffect(() => {
    loadWallet();
    fetchUserAndStartups();
  }, []);

  const fetchUserAndStartups = async () => {
    try {
      setLoading(true);

      const loggedInUser = await startupOwnerServices.get();
      setUser(loggedInUser);
      console.log("User:", loggedInUser);

      const startups = await startupDetailsServices.getAllStartups();
      setStartupList(startups);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMyStartups = () => {
    return startupList.filter((startup) => startup.ownerId === user?.$id);
  };

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

  // wallet callse start here
  const loadWallet = async () => {
    setWalletLoading(true);
    const provider = new ethers.BrowserProvider(ethereum);
    const accounts = await provider.listAccounts();
    console.log("Accounts:", accounts);
    try {
      if (accounts.length > 0) {
        setAddress(accounts[0].address);

        const usersContract = new ethers.Contract(
          contractConfig.usersContract,
          UsersContract,
          provider
        );

        let investorDetails = await usersContract.getInvestorDetails(
          accounts[0].address
        );

        if (investorDetails[0] === "") {
          setIsRegisteredAsUser(false);
          let orgDetails = await usersContract.getOrgDetails(
            accounts[0].address
          );

          if (orgDetails[0] === "") {
            setIsRegisteredAsStartupOwner(false);
          } else {
            setIsRegisteredAsStartupOwner(true);
          }
        } else {
          setIsRegisteredAsUser(true);
        }

        console.log("Investor Details:", investorDetails[0]);
      }
      // setWalletLoading(false);
    } catch (error) {
      console.error("Error in loadWallet", error);
      // setWalletLoading(false);
    } finally {
      setWalletLoading(false);
    }
  };
  const connectWallet = async () => {
    setWalletLoading(true);
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = provider.getSigner();

      loadWallet();
    } catch (error) {
      console.error("Error in connectWallet", error);
    }
    setWalletLoading(false);
  };

  const registerInvestor = async (formData) => {
    setWalletLoading(true);
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const usersContract = new ethers.Contract(
        contractConfig.usersContract,
        UsersContract,
        signer
      );
      const accounts = await provider.listAccounts();
      const tx = await usersContract.registerInvestor(
        formData.name,
        formData.email,
        formData.phone,
        formData.country,
        formData.city,
        formData.postalCode
      );

      await tx.wait();

      let investorDetails = await usersContract.getInvestorDetails(
        accounts[0].address
      );

      setIsRegisteredAsUser(true);
      await loadWallet();
      return investorDetails;
    } catch (error) {
      console.error("Error in registerInvestor", error);
    } finally {
      setWalletLoading(false);
    }
  };

  const registerStartupOwner = async (formData) => {
    setWalletLoading(true);
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const usersContract = new ethers.Contract(
        contractConfig.usersContract,
        UsersContract,
        signer
      );
      const accounts = await provider.listAccounts();
      const tx = await usersContract.registerOrg(
        formData.orgName,
        formData.orgType,
        formData.orgCountry,
        formData.orgCity
      );

      await tx.wait();

      let orgDetails = await usersContract.getOrgDetails(accounts[0].address);

      setIsRegisteredAsStartupOwner(true);
      await loadWallet();
      return orgDetails;
    } catch (error) {
      console.error("Error in registerStartupOwner", error);
    } finally {
      setWalletLoading(false);
    }
  };

  const contextValue = {
    startupList,
    addStartup,
    removeStartup,
    user,
    getMyStartups,
    loading,
    error,

    wallet: {
      address,
      isRegisteredAsUser,
      connectWallet,
      loadWallet,
      registerInvestor,
      loading: walletLoading,
      registerStartupOwner,
      isRegisteredAsStartupOwner,
    },
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
