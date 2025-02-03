import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePacienteStore } from "../store/pacienteStore";
import { Button } from "@/components/ui";
import { PaginationPersonal } from "./Pagination";
import { FC } from "react";
import { View } from "lucide-react";
import { Paciente } from "@/config/types/pacientes.types";

interface GestionTableProps {
  showModal: () => void;
}

export const GestionTable: FC<GestionTableProps> = ({ showModal }) => {
  const pacientes = usePacienteStore((state) => state.pacientes);
  const { page, totalPages, nextPage, previousPage, goPage } = usePacienteStore(
    (state) => state
  );
  const setPaciente = usePacienteStore((state) => state.setPaciente);
  const MostrtarPaciente = (personal: Paciente) => {
    setPaciente(personal);
    console.log(personal);
    showModal();
  };

  return (
    <Table
      className="w-4/5 bg-white rounded-lg overflow-hidden shadow-lg px-8 mx-auto"
      content="w-full"
      color="bg-white"
    >
      <TableCaption>Listado de pacientes de la Fundacion</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Cedula de Identidad</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Fecha de Nacimiento</TableHead>
          <TableHead className="text-center">Guardian Legal</TableHead>
          <TableHead className="text-center" align="center">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pacientes.length !== 0 &&
          pacientes.map((paciente) => (
            <TableRow key={paciente.id}>
              <TableCell>{paciente.dni}</TableCell>
              <TableCell>
                {paciente.firstname} {paciente.lastname}
              </TableCell>
              <TableCell className="">
                {new Date(paciente.birthdate).toLocaleDateString("es-ES")}
              </TableCell>
              <TableCell className="font-medium">
                {paciente.legalGuardian}
              </TableCell>

              <TableCell
                className="text-center flex gap-3 justify-center"
                align="center"
              >
                <Button
                  variant="secondary"
                  onClick={() => MostrtarPaciente(paciente)}
                >
                  <View size={20} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>
            <PaginationPersonal
              currentPage={page}
              goToPage={(page) => goPage(page)}
              totalPages={totalPages}
              nextPage={nextPage}
              previousPage={previousPage}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
