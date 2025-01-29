import { Button, Input } from "@/components/ui";

import { DashboardLayout } from "@/shared/layout/DashboardLayout";
import { UserPlus } from "lucide-react";
import { GestionTable } from "../components/gestionTable";
import { usePersonalStore } from "../store/personalStore";
import { useEffect, useState } from "react";
import { CreateEditModal } from "../components/CreateEditModal";
export const GestionarPersonalPage = () => {
  const getPersonal = usePersonalStore((state) => state.getPersonal);
  const setOnePersonal = usePersonalStore((state) => state.setOnePersonal);
  const [showModal, setShowModal] = useState(false);

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
        Gestion del Personal
      </h1>
      <section className="mt-6 flex justify-between items-center mx-10">
        <div className="flex justify-between items-center w-1/3">
          <Input placeholder="Buscar personal" />
        </div>
        <Button className="">
          <span
            className="mr-2"
            onClick={() => {
              setOnePersonal(null);
              mostrarModal();
            }}
          >
            Nuevo Personal
          </span>
          <UserPlus className="h-4 w-4" />
        </Button>
      </section>
      <section className=" mx-auto mt-6">
        <GestionTable showModal={mostrarModal} />
      </section>

      {showModal && <CreateEditModal onClose={cerrarModal} />}
    </DashboardLayout>
  );
};
