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
import { signUpSchema } from "../validations/sign-up.validation";
import { AUTH_ERRORS } from "../constants/authErrors";

export const SignUpForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});
    const result = signUpSchema.safeParse(form);
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
      const { error } = await supabase.auth.signUp({
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
        mutate();
        router.push(privateRoutes.dashboard);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Registrarse</CardTitle>
          <CardDescription>
            Ingresa tu email para crear una cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
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
            <div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Repetir contraseña"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                aria-invalid={!!fieldErrors.confirmPassword}
              />
              {fieldErrors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {fieldErrors.confirmPassword}
                </div>
              )}
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
            {error && <div className="text-red-500">{error}</div>}
          </form>
        </CardContent>
        <CardFooter>
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link
              className="text-blue-500 underline"
              href={publicRoutes.signIn}
            >
              Inicia sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
