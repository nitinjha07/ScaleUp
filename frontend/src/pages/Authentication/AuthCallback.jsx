import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account, Databases, Query, ID } from "appwrite";
import { client, appwriteConf } from "../../lib/appwrite/config.appwrite";

const account = new Account(client);
const databases = new Databases(client);

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeAuth = async () => {
      try {
        const user = await account.get();
        const userId = user.$id;

        const userDoc = await databases.listDocuments(
          appwriteConf.startupDB,
          appwriteConf.startupDBStartupDetails,
          [Query.equal("email", user.email)]
        );

        if (userDoc.total === 0) {
         e
          await databases.createDocument(
            appwriteConf.startupDB,
            appwriteConf.startupDBStartupDetails,
            userId,
            { name: user.name, email: user.email, role: "startup_owner" }
          );
        }

        navigate("/dashboard");
      } catch (err) {
        console.error("Auth error:", err);
        navigate("/register/startup-owner");
      }
    };

    completeAuth();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <p>Authenticating...</p>
    </div>
  );
};

export default AuthCallback;
