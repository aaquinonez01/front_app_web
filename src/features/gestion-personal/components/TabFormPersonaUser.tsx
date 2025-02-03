import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const TabFormPersonalUser = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          {...register("email", { required: "El correo es obligatorio" })}
          placeholder="ejemplo@google.com"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="username">Nombre de Usuario</Label>
        <Input
          id="username"
          {...register("username", {
            required: "El nombre de usuario es obligatorio",
          })}
          placeholder="example123"
        />
      </div>
    </div>
  );
};
