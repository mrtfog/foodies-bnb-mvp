"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/core/hooks/useAuth";

import { supabase } from "@/core/api/supabase";
import { publicRoutes } from "@/core/models/routes.model";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { removeLocalStorageItem } from "@/utilities/localStorage.utility";

export default function DashboardPage() {
  const { user, mutate } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    (() => {
      if (!user) {
        router.push(publicRoutes.signIn);
      }
      console.log(user);
      setMounted(true);
    })();
  }, [user, router]);

  return (
    <div>
      <p>¡Hola, {mounted && user?.email ? user.email : "..."}!</p>
      <Button
        onClick={async () => {
          await supabase.auth.signOut();
          removeLocalStorageItem("user");
          mutate();
          router.push(publicRoutes.signIn);
        }}
      >
        Cerrar sesión
      </Button>
    </div>
  );
}
