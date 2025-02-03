import { Button, Input } from "@/components/ui";
import { Toaster } from "sonner";
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
      <section className="mt-6 flex justify-end items-center mx-10">
        <Button
          className="w-1/4"
          onClick={() => {
            setOnePersonal(null);
            mostrarModal();
          }}
        >
          <span className="mr-2">Nuevo Personal</span>
          <UserPlus className="h-4 w-4" />
        </Button>
      </section>
      <section className=" mx-auto mt-6">
        <GestionTable showModal={mostrarModal} />
      </section>

      {showModal && <CreateEditModal onClose={cerrarModal} />}
      <Toaster />
    </DashboardLayout>
  );
};
