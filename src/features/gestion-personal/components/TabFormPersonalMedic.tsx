import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

const roles = [
  { id: "1", name: "Terapia", value: "TERAPIA" },
  { id: "2", name: "Psicología", value: "PSICOLOGIA" },
];

export const TabFormPersonalMedic = () => {
  const { register, setValue } = useFormContext();

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="space-y-1 col-span-2">
        <Label htmlFor="dni">DNI</Label>
        <Input
          id="dni"
          {...register("userInformation.userId")}
          placeholder="Ingrese su DNI"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="firstname">Nombre</Label>
        <Input
          id="firstname"
          {...register("userInformation.firstName")}
          placeholder="Ingrese su nombre"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="lastname">Apellido</Label>
        <Input
          id="lastname"
          {...register("userInformation.lastName")}
          placeholder="Ingrese su apellido"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          {...register("userInformation.address")}
          placeholder="Ingresa tu dirección"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          {...register("userInformation.phone")}
          placeholder="Ingresa tu teléfono"
        />
      </div>
      <div className="space-y-1 col-span-2">
        <Label>Especialidad</Label>
        <Select onValueChange={(value) => setValue("userRoles", [value])}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una especialidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.value}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
