import { Databases, ID, Query } from "appwrite";
import { appwriteConf, client } from "./config.appwrite";

export class startupDetails {
  databases;
  constructor() {
    this.databases = new Databases(client);
  }
  async addStartup(data) {
    const result = await this.databases.createDocument(
      appwriteConf.startupDB,
      appwriteConf.startupDBStartupDetails,
      ID.unique(),
      data
    );

    return result;
  }

  async getAllStartups(query) {
    const buildQuery = [];
    if (query) {
      if (query.category) {
        buildQuery.push(Query.equal("startupCategory", query.category));
      }
      if (query.search) {
        buildQuery.push(Query.contains("startupName", query.search));
        buildQuery.push(Query.contains("startupDescription", query.search));
      }

      if (query.limit) {
        buildQuery.push(Query.limit(query.limit));
      }
    }
    const results = await this.databases.listDocuments(
      appwriteConf.startupDB,
      appwriteConf.startupDBStartupDetails,
      buildQuery
    );

    return results.documents;
  }

  async getOneStartup(docId) {
    const result = await this.databases.getDocument(
      appwriteConf.startupDB,
      appwriteConf.startupDBStartupDetails,
      docId
    );

    return result;
  }
}

const startupDetailsServices = new startupDetails();

export { startupDetailsServices };
