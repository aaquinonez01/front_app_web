import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogoutUser } from "./LogoutUser";
import { useAuthStore } from "@/features/auth/store/authStore";
import { MenuSidebarList } from "./MenuSidebarList";
import { Separator } from "@/components/ui/separator";

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <aside className="w-[260px] bg-white rounded-r-3xl shadow-lg flex flex-col h-full overflow-y-auto">
      {/* User Profile */}
      <div className="p-6 flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback>
            {user?.userInformation?.firstName[0] ||
              "" + user?.userInformation.lastName[0] ||
              ""}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-sm font-medium leading-none">
            {user?.userInformation?.firstName} {user?.userInformation?.lastName}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {user?.email}
          </p>
        </div>
      </div>
      <Separator className="mx-2" />

      {/* Navigation */}
      <MenuSidebarList />

      {/* Footer */}
      <LogoutUser />
    </aside>
  );
};
