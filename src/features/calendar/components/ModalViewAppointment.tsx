import { useAppointmentStore } from "../store/appointmentStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const ModalVIewAppointment = () => {
  const selectedEvent = useAppointmentStore(
    (state) => state.selectedAppointment
  );
  const selectEvent = useAppointmentStore((state) => state.selectAppointment);
  const handleClose = () => selectEvent(null);

  return (
    <Dialog open={!!selectedEvent} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedEvent?.specialtyTherapy}</DialogTitle>
          <DialogDescription>
            {selectedEvent?.diagnosis || "Sin descripción disponible"}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Inicio:</strong> {selectedEvent?.date.toLocaleString()}
          </p>
          <p>
            <strong>Fin:</strong>{" "}
            {selectedEvent?.appointmentTime.toLocaleString()}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleClose}>Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
