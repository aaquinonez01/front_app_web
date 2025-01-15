import { DashboardLayout } from "@/shared/layout/DashboardLayout";
import { SearchInput } from "../components/SearchInput";
import { HistoriaClinica } from "../components/HistoriaClinica";
import { useHistorialStore } from "../store/historialStore";

export const HistoriaClinicaPage = () => {
  const getHistoriaClinicaByCedula = useHistorialStore(
    (state) => state.obtenerHistoriaClinica
  );
  const handleSearchPaciente = (cedula: string) => {
    getHistoriaClinicaByCedula(cedula);
  };
  return (
    <DashboardLayout>
      <section className="w-full h-full">
        <h1 className="text-3xl">Historias Clinicas</h1>
        <main className="flex flex-col gap-4">
          <SearchInput handleSearchInput={handleSearchPaciente} />

          <HistoriaClinica />
        </main>
      </section>
    </DashboardLayout>
  );
};
