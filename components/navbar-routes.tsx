"use client";

import { usePathname } from "next/navigation";
import { LogOut, LucideMessagesSquare, LucidePenSquare } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { SearchInput } from "./search-input";
import { useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import UserAccountNav from "./user-account-nav";

export const NavbarRoutes = () => {
  const session = useSession();
  const pathname = usePathname();

  const isAdmin = session?.data?.user?.isAdmin;

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  const user: {
    email: string | undefined;
    name: string | undefined;
    imageUrl: string | undefined;
  } = {
    email: session?.data?.user?.email!,
    name: session?.data?.user?.name!,
    imageUrl: session?.data?.user?.image!,
  };

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/main">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isAdmin ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              <LucidePenSquare className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <Link href="/teamchat">
          <Button size="sm" variant="ghost">
            <LucideMessagesSquare className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            Team Chat App
          </Button>
        </Link>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
          <ModeToggle />
        </div>
        <UserAccountNav user={user} />
      </div>
    </>
  );
};
