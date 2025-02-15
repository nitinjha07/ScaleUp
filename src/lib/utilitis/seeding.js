import { startupDetailsServices } from "../appwrite/startupDetails";
import { startupLists } from "../constants/startupLists";

export async function seedDetails(userId) {
  await Promise.all(
    startupLists.map(async (startup) => {
      startupDetailsServices.addStartup({
        ownerId: userId,
        startupName: startup.startupName,
        startupCategory: startup.startupCategory,
        startupDescription: startup.startupDescription,
      });
    })
  );

}
