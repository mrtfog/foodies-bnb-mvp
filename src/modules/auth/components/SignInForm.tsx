"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/core/api/supabase";
import { useAuth } from "@/core/hooks/useAuth";
import { privateRoutes, publicRoutes } from "@/core/models/routes.model";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInSchema } from "../validations/sign-in.validation";
import { AUTH_ERRORS } from "../constants/authErrors";
import { setLocalStorageItem } from "@/utilities/localStorage.utility";

export const SignInForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<{
    [k: string]: string | undefined;
  }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});
    const result = signInSchema.safeParse(form);
    if (!result.success) {
      const errors: { [k: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        const customMessage =
          AUTH_ERRORS[error.message] ||
          AUTH_ERRORS[error.name] ||
          error.message;
        setError(customMessage);
      } else {
        if (data?.user) {
          setLocalStorageItem("user", data.user);
        }
        mutate();
        router.push(privateRoutes.dashboard);
      }
    } catch (error) {
      setError("Error inesperado al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Ingresa tu email para iniciar sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {fieldErrors.email}
                </div>
              )}
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
                aria-invalid={!!fieldErrors.password}
              />
              {fieldErrors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {fieldErrors.password}
                </div>
              )}
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
            {error && <div className="text-red-500">{error}</div>}
          </form>
        </CardContent>
        <CardFooter>
          <p>
            ¿No tienes una cuenta?{" "}
            <Link
              className="text-blue-500 underline"
              href={publicRoutes.signUp}
            >
              Regístrate
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
