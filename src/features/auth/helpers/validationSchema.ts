import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("El correo electrónico no es válido")
    .nonempty("El correo electrónico es obligatorio"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un símbolo"
    )
    .nonempty("La contraseña es obligatoria"),
});

// Deriva el tipo de TypeScript automáticamente
export type LoginSchema = z.infer<typeof loginSchema>;
