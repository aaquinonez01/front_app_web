import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { AuthLayout } from "../layout/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 items-center">
          <div className="flex items-center justify-center mb-4 w-1/5">
            <img src="logo.webp" alt="logo" />
          </div>
          <CardTitle className="text-2xl text-center font-bold">
            Bienvenido
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Sistema Administrativo de la Fundación de Niños Especiales
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>

        <div className="text-center pb-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </Card>
    </AuthLayout>
  );
}
