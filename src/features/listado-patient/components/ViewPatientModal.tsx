import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePacienteStore } from "../store/pacienteStore";
import { FC } from "react";

interface ViewPatientModalProps {
  onClose: () => void;
}

export const ViewPatientModal: FC<ViewPatientModalProps> = ({ onClose }) => {
  const patient = usePacienteStore((state) => state.paciente);
  if (!patient) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[626px]">
        <DialogHeader>
          <DialogTitle>Detalles del Paciente</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[530px] pr-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {patient.firstname} {patient.lastname}
              </CardTitle>
              <CardDescription>ID: {patient.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Información Personal</h4>
                <Separator className="my-2" />
                <div className="grid grid-cols-2 gap-2">
                  <div>Fecha de Nacimiento:</div>
                  <div>{new Date(patient.birthdate).toLocaleDateString()}</div>
                  <div>DNI:</div>
                  <div>{patient.dni}</div>
                  <div>Género:</div>
                  <div>{patient.gender}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Representante Legal</h4>
                <Separator className="my-2" />
                <div className="grid grid-cols-2 gap-2">
                  <div>Nombre:</div>
                  <div>{patient.legalGuardian}</div>
                  <div>ID:</div>
                  <div>{patient.legalGuardianId}</div>
                  <div>Relación:</div>
                  <div>{patient.relationshipRepresentativePatient}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Información Médica</h4>
                <Separator className="my-2" />
                <div className="grid grid-cols-2 gap-2">
                  <div>Seguro de Salud:</div>
                  <div>{patient.healthInsurance}</div>
                  <div>Discapacidad:</div>
                  <div>{patient.disability.join(", ") || "Ninguna"}</div>
                  <div>Tipo de Terapia Requerida:</div>
                  <div>{patient.typeTherapyRequired.join(", ")}</div>
                  <div>Medicamentos Actuales:</div>
                  <div>
                    {patient.currentMedications.join(", ") || "Ninguno"}
                  </div>
                  <div>Alergias:</div>
                  <div>{patient.allergies.join(", ") || "Ninguna"}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Historial y Observaciones</h4>
                <Separator className="my-2" />
                <div>
                  <div className="font-medium">Historial de Tratamientos:</div>
                  <div>
                    {patient.historyTreatmentsReceived.join(", ") || "Ninguno"}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="font-medium">Observaciones:</div>
                  <div>{patient.observations || "N/A"}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
