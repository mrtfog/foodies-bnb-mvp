"use client";

import { useAuth } from "@/core/hooks/useAuth";
import { Button } from "../ui/button";
import { HomeIcon, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { removeLocalStorageItem } from "@/utilities/localStorage.utility";
import { supabase } from "@/core/api/supabase";
import { privateRoutes, publicRoutes } from "@/core/models/routes.model";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlatformTopbar = () => {
  const { user, mutate } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              FoodiesBNB
            </h1>
            <p className="text-lg text-orange-600 font-medium">
              {mounted && user?.email
                ? `Bienvenido, ${user.email}! 🍽️`
                : "Bienvenido! 🍽️"}
            </p>
          </div>

          <nav className="flex items-center space-x-2">
            <Link href={privateRoutes.dashboard}>
              <Button variant="ghost">
                <HomeIcon className="w-4 h-4" />
                Inicio
              </Button>
            </Link>
            <Link href={privateRoutes.profile}>
              <Button variant="ghost">
                <UserIcon className="w-4 h-4" />
                Perfil
              </Button>
            </Link>
          </nav>

          <div className="mt-4 sm:mt-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Button
                variant="outline"
                onClick={() => {
                  supabase.auth.signOut();
                  removeLocalStorageItem("user");
                  mutate();
                  router.push(publicRoutes.signIn);
                }}
              >
                <LogOutIcon className="w-4 h-4" />
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
