"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { UserAvatar } from "./user-avatar";

type Props = {
  user: any;
};

const UserAccountNav = ({ user }: Props) => {
  return (
    <div className="pb-0">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar src={user?.imageUrl || "/placeholder.jpg"} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-white dark:bg-gray-800 dark:text-gray-300"
          align="end"
        >
          <div className="p-2">
            {user.name && (
              <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">
                {user.name}
              </p>
            )}
            {user.email && (
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                {user.email}
              </p>
            )}
          </div>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              signOut().catch(console.error);
            }}
            className="text-sky-700 dark:text-sky-300 cursor-pointer"
          >
            Sign out
            <LogOut className="w-4 h-4 ml-2 text-sky-700 dark:text-sky-300" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAccountNav;
