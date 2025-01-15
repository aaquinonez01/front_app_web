import { Sidebar } from "@/shared/components/Sidebar";
import { FC } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-200 overflow-hidden py-3 px-4 gap-5">
      <Sidebar />
      <section className="flex-1 overflow-y-auto bg-white h-full rounded-3xl p-6">
        {children}
      </section>
    </div>
  );
};
