"use client";

import { useSession } from "next-auth/react";
import { UserAvatar } from "../user-avatar";
import { User } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";

interface AvatarProps {
  user?: User;
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
          <UserAvatar src={user?.image || "/placeholder.jpg"} />
        </div>
      )}
    </div>
  );
};

export default Signout;
