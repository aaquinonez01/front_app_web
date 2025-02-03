import { usePersonalStore } from "../store/personalStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabFormPersonalUser } from "./TabFormPersonaUser";
import { TabFormPersonalMedic } from "./TabFormPersonalMedic";
import { useForm, FormProvider } from "react-hook-form";

export const CreateEditModal = ({ onClose }: { onClose: () => void }) => {
  const { onePersonal, savePersonal } = usePersonalStore();
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    savePersonal(data, data.role);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Personal</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Tabs defaultValue="user" className="w-[450px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">Información Usuario</TabsTrigger>
                <TabsTrigger value="medic">Información Médico</TabsTrigger>
              </TabsList>
              <TabsContent value="user">
                <TabFormPersonalUser />
              </TabsContent>
              <TabsContent value="medic">
                <TabFormPersonalMedic personal={onePersonal} />
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-4">
              <Button onClick={() => onClose()}>Cancelar</Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
