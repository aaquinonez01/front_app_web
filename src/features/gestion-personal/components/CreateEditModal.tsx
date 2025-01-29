import { useState, useEffect, FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/config/types/users.types";
import { usePersonalStore } from "../store/personalStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

interface CreateEditModalProps {
  onClose: () => void;
}

const roles = [
  { id: "1", name: "Terapia", value: "TERAPIA" },
  { id: "2", name: "Psicologia", value: "PSICOLOGIA" },
];

export const CreateEditModal: FC<CreateEditModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
    username: "",
    userInformation: {
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      userId: "",
    },
    userRoles: [],
    isActive: true,
  });

  const person = usePersonalStore((state) => state.onePersonal);

  const onSubmit = (formData: User) => {
    console.log(formData);
  };

  useEffect(() => {
    console.log(person);
    if (person) {
      setFormData({
        email: person.email || "",
        password: "", // We don't set the password for editing
        username: person.username || "",
        userInformation: {
          userId: person.userInformation?.userId || "",
          firstName: person.userInformation?.firstName || "",
          address: person.userInformation?.address || "",
          phone: person.userInformation?.phone || "",
          lastName: person.userInformation?.lastName || "",
        },
        userRoles: person.userRoles || [],
        isActive: person.isActive || true,
      });
    }
  }, [person]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in formData.userInformation) {
      setFormData((prev) => ({
        ...prev,
        userInformation: {
          ...prev.userInformation,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {person?.username ? "Editar Personal" : "Registrar Personal"}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="user" className="w-[450px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">Informacion Usuario</TabsTrigger>
            <TabsTrigger value="medic">Informacion de Medico</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Datos de {person?.username ? "Usuario" : "Nuevo Usuario"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Correo Electronico</Label>
                  <Input
                    id="email"
                    defaultValue=""
                    placeholder="ejemplo.google.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Nombre de Usuario</Label>
                  <Input
                    id="username"
                    defaultValue=""
                    placeholder="example123"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medic">
            <Card>
              <CardContent className="space-y-1 grid grid-cols-2 py-2 gap-2">
                <div className="space-y-1 col-span-2 w-2/3">
                  <Label htmlFor="dni">DNI</Label>
                  <Input
                    id="dni"
                    defaultValue="0804199248"
                    placeholder="Ingresa tu DNI"
                  />
                </div>
                <div className="space-y-1 mt-0">
                  <Label htmlFor="firstname">Nombre</Label>
                  <Input
                    id="firstname"
                    defaultValue="Alexander"
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastname">Apellido</Label>
                  <Input
                    id="lastname"
                    defaultValue="Quinonez"
                    placeholder="Ingresa tu apellido"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="specialty">Especialidad</Label>
                  <Input
                    id="specialty"
                    defaultValue="Terapia"
                    placeholder="Ingresa tu especialidad"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    defaultValue="lofyeyirko"
                    placeholder="Ingresa tu dirección"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    defaultValue="lofyeyirko"
                    placeholder="Ingresa tu teléfono"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Role</Label>
                  <Select onValueChange={(value) => handleMedicChange(value)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Seleccione Un Rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Medicos</SelectLabel>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.value}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={false} color="primary">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
