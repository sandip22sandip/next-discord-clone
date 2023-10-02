import { db } from "@/lib/db";
import getSession from "./getSession";

export const currentProfile = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await db.profile.findUnique({
      where: {
        userId: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};
