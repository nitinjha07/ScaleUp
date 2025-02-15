import { Client } from "appwrite";

const appwriteConf = {
  frontendBase:import.meta.env.VITE_PUBLIC_ENDPOINT,
  endpoint: "https://cloud.appwrite.io/v1",
  project: import.meta.env.VITE_PUBLIC_PROJECT,
  startupDB: import.meta.env.VITE_PUBLIC_STARTUP_DB,
  startupDBStartupDetails: import.meta.env
    .VITE_PUBLIC_STARTUP_DB_STARTUP_DETAILS,
    
  // STORAGE CONFIG
  photoStorage: import.meta.env.VITE_PUBLIC_STORAGE_PHOTO,
  videoStorage: import.meta.env.VITE_PUBLIC_STORAGE_VIDEO,
};

const client = new Client()
  .setEndpoint(appwriteConf.endpoint) // Your API Endpoint
  .setProject(appwriteConf.project); // Your project ID

export { client, appwriteConf };
