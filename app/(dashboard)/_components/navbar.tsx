import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white dark:bg-gray-900 shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
