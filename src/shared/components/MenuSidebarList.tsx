"use client";
import { Button } from "@/components/ui";
import { menuSidebar } from "@/config/constants/menuSidebar";
import { Link, useLocation } from "react-router-dom";

export const MenuSidebarList = () => {
  const pathname = useLocation().pathname;

  return (
    <nav className="flex-1 px-4 pt-4">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground px-2 py-2">
          Menu
        </p>

        {menuSidebar.map((item, index) => (
          <Button
            asChild
            key={index}
            variant="ghost"
            className={
              `w-full justify-start gap-4 hover:bg-black hover:text-white py-5` +
              (pathname === item.href ? " bg-black text-white" : "")
            }
          >
            <Link to={item.href}>
              <div className="flex items-center gap-4">
                {item.icon}
                <span className="flex-1 text-left">{item.name}</span>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
};
