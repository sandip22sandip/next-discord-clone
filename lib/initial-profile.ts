import { db } from "@/lib/db";
import getSession from "./getSession";

export const initialProfile = async () => {
  try {
    const session = await getSession();

    // if (!user) {
    //   return redirectToSignIn();
    // }

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;

    // const newProfile = await db.profile.create({
    //   data: {
    //     userId: user.id,
    //     name: `${user.firstName} ${user.lastName}`,
    //     image: user.image,
    //     email: user.emailAddresses[0].emailAddress
    //   }
    // });

    // return newProfile;
  } catch (error: any) {
    return null;
  }
};
