import { DashboardLayout } from "@/shared/layout/DashboardLayout";
import { ModalVIewAppointment } from "../components/ModalViewAppointment";
import { CalendarAppointment } from "../components/CalendarAppointment";
import { useEffect } from "react";
import { useMedicStore } from "../store/medicStore";
export const CalendarioPage = () => {
  const getMedics = useMedicStore((state) => state.getMedics);
  useEffect(() => {
    getMedics(1, 15);
  }, [getMedics]);
  return (
    <DashboardLayout>
      <div className="w-full h-full  bg-gray-100">
        <ModalVIewAppointment />
        <CalendarAppointment />
      </div>
    </DashboardLayout>
  );
};
