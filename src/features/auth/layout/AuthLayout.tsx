import { FC } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      {children}
    </main>
  );
};
