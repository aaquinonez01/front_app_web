"use client";

import { Button } from "@/components/ui";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/authStore";

export const LogoutUser = () => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className=" p-4 mt-auto space-y-2">
      <Button
        variant="destructive"
        className="w-full justify-start gap-4 text-white hover:bg-red-600 hover:text-white py-5"
        onClick={() => {
          logout();
        }}
      >
        <LogOut className="h-7 w-7" />
        <span>Logout Account</span>
      </Button>
    </div>
  );
};
