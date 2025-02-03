import { Button, Input } from "@/components/ui";
import { Toaster } from "sonner";
import { DashboardLayout } from "@/shared/layout/DashboardLayout";
import { GestionTable } from "../components/gestionTable";
import { usePacienteStore } from "../store/pacienteStore";
import { useEffect, useState } from "react";
import { ViewPatientModal } from "../components/ViewPatientModal";
import { Separator } from "@/components/ui/separator";
export const ListadoPacientePage = () => {
  const getPersonal = usePacienteStore((state) => state.getPacientes);
  const getPacienteByDni = usePacienteStore((state) => state.getPacienteByDni);

  const [showModal, setShowModal] = useState(false);
  const [dniPaciente, setDniPaciente] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDniPaciente(e.target.value);
  };
  const onSearch = async () => {
    if (dniPaciente === "") return;

    const pacienteEncontrado = await getPacienteByDni(dniPaciente);

    if (pacienteEncontrado) {
      setShowModal(true); // Solo abre el modal si se encontró al paciente
    }
  };
  const mostrarModal = () => {
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getPersonal(1, 10);
  }, [getPersonal]);
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-800">
        Listado de Pacientes
      </h1>
      <section className="mt-6 flex justify-between items-center mx-24">
        <div className="flex justify-between items-center w-1/3 gap-4">
          <Input
            placeholder="Buscar Paciente por cedula"
            name="dniPaciente"
            value={dniPaciente}
            onChange={onChange}
          />
          <Button onClick={onSearch}>Buscar</Button>
        </div>
      </section>
      <Separator className="my-2" />
      <section className=" mx-auto mt-6">
        <GestionTable showModal={mostrarModal} />
        {showModal && <ViewPatientModal onClose={cerrarModal} />}
      </section>
      <Toaster />
    </DashboardLayout>
  );
};
