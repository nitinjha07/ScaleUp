import { Permission, Storage } from "appwrite";
import { appwriteConf, client } from "./config.appwrite";

export class StorageServices {
  storage;
  constructor() {
    this.storage = new Storage(client);
  }

  async uploadImage(imageFile) {
    const result = await this.storage.createFile(
      appwriteConf.photoStorage,
      ID.unique(),
      imageFile,
      [Permission.read("any")]
    );

    return result.$id;
  }

  async uploadVideo(videoFile) {
    const result = await this.storage.createFile(
      appwriteConf.videoStorage,
      ID.unique(),
      videoFile,
      [Permission.read("any")]
    );

    return result.$id;
  }

  getPreview(fileId) {
    const result = this.storage.getFilePreview(
      appwriteConf.photoStorage,
      fileId
    );

    return result;
  }
}

export const storageServices = new StorageServices();
