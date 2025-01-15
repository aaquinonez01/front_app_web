import { Button, Input, Label } from "@/components/ui";
import { useForm } from "react-hook-form";
import { LogIn } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { loginSchema, LoginSchema } from "../helpers/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
export const LoginForm = () => {
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema), // Usa el esquema de Zod como resolver
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    login(data.email, data.password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {errorMessage}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" {...register("password")} />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message?.toString()}
            </p>
          )}
          <Button className="w-full py-5" type="submit" disabled={isSubmitting}>
            <LogIn className="mr-2 h-4 w-4" />{" "}
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>
        </div>
      </form>
    </div>
  );
};
