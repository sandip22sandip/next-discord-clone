"use client";

import { useSession } from "next-auth/react";
import { UserAvatar } from "../user-avatar";
import { Profile } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";

interface AvatarProps {
  user?: Profile;
}

const Signout: React.FC<AvatarProps> = ({ user }) => {
  const { status } = useSession();
  const { onOpen } = useModal();

  return (
    <div>
      {status === "authenticated" && (
        <div
          className="cursor-pointer hover:drop-shadow-md transition"
          onClick={() => onOpen("profileSettings", { user })}
        >
          <UserAvatar src={user?.imageUrl || "/placeholder.jpg"} />
        </div>
      )}
    </div>
  );
};

export default Signout;
