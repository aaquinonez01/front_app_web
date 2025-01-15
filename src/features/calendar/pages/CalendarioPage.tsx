import { DashboardLayout } from "@/shared/layout/DashboardLayout";
import { ModalVIewAppointment } from "../components/ModalViewAppointment";
import { CalendarAppointment } from "../components/CalendarAppointment";
import { useAppointmentStore } from "../store/appointmentStore";
import { useEffect } from "react";
export const CalendarioPage = () => {
  const getAppointment = useAppointmentStore((state) => state.getAppointments);

  useEffect(() => {
    getAppointment(1, 10);
  }, [getAppointment]);
  return (
    <DashboardLayout>
      <div className="w-full h-full  bg-gray-100">
        <ModalVIewAppointment />
        <CalendarAppointment />
      </div>
    </DashboardLayout>
  );
};
