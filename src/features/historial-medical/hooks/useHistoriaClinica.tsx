import { useHistorialStore } from "@/features/historial-medical/store/historialStore";

export const useHistoriaClinica = () => {
  const historiaClinica = useHistorialStore((state) => state.historiaClinica);
  const loading = useHistorialStore((state) => state.loading);

  return { historiaClinica, loading };
};
