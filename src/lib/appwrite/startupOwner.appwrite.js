import { Account, OAuthProvider } from "appwrite";
import { appwriteConf, client } from "./config.appwrite";

const account = new Account(client);

export class StartupOwner {
  async get() {
    return await account.get();
  }

  async logOut() {
    return await account.deleteSession("current");
  }

  async update(data) {
    return await account.update(data);
  }

  async loginStartupOwner() {
    account.createOAuth2Session(
      OAuthProvider.Github, // provider
      `${appwriteConf.frontendBase}/startup-owner/dashboard`, // redirect here on success
      appwriteConf.frontendBase, // redirect here on failure
      ["repo", "user"] // scopes (optional)
    );
  }
}

const startupOwnerServices = new StartupOwner();

export { startupOwnerServices };
