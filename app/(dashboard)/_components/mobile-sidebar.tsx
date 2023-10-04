import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu className="dark:text-white" /> {/* Apply dark text color */}
      </SheetTrigger>
      <SheetContent side="left" className="p-0 dark:bg-gray-900">
        {" "}
        {/* Apply dark background color */}
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
