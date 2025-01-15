import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";
import { HomePage } from "@/features/home/pages/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import { useEffect } from "react";
import { HistoriaClinicaPage } from "@/features/historial-medical/pages/HistoriaClinicaPage";
import { GestionarPersonalPage } from "@/features/gestion-personal/pages/GestionarPersonalPage";
import { CalendarioPage } from "@/features/calendar/pages/CalendarioPage";
import LoadingSpinner from "@/shared/components/Loading";

export const AppRoutes = () => {
  const status = useAuthStore((state) => state.status);
  const checkAuthentication = useAuthStore(
    (state) => state.checkAuthentication
  );

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (status === "checking") {
    return <LoadingSpinner />;
  }

  return (
    <>
      {status === "authenticated" ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendario" element={<CalendarioPage />} />
          <Route path="/historias-clinicas" element={<HistoriaClinicaPage />} />
          <Route path="/gestion-personal" element={<GestionarPersonalPage />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
};
