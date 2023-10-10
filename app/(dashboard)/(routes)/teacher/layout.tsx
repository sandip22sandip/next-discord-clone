import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await currentProfile();

  const isAdmin = profile?.isAdmin;
  if (!isAdmin) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default TeacherLayout;
