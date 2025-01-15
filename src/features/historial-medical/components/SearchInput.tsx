"use client";
import { Button, Input } from "@/components/ui";
import { FC, useState } from "react";
import { useHistorialStore } from "../store/historialStore";

interface Props {
  handleSearchInput: (cedula: string) => void;
}

export const SearchInput: FC<Props> = ({ handleSearchInput }) => {
  const [cedula, setCedula] = useState<string>("");
  const setHistoriaClinica = useHistorialStore(
    (state) => state.setHistoriaClinica
  );

  return (
    <div className="flex gap-4 mt-4">
      <Input
        type="text"
        placeholder="Ingrese la cedula"
        className="w-1/2"
        name="cedula"
        value={cedula}
        onChange={(e) => {
          setCedula(e.target.value);
        }}
      />
      <Button onClick={() => handleSearchInput(cedula)} type="button">
        Buscar Paciente
      </Button>
      <Button
        onClick={() => setHistoriaClinica(null)}
        className="w-1/6
          bg-red-500
          "
      >
        Limpiar Historia
      </Button>
    </div>
  );
};
