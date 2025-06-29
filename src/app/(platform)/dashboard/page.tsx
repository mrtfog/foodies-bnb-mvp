"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/core/hooks/useAuth";

import { supabase } from "@/core/api/supabase";
import { publicRoutes } from "@/core/models/routes.model";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, mutate } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(publicRoutes.signIn);
    }
  }, [user, router]);

  return (
    <div>
      <p>¡Hola, {user?.email}!</p>
      <Button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push(publicRoutes.signIn);
          mutate();
        }}
      >
        Cerrar sesión
      </Button>
    </div>
  );
}
