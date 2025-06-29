"use client";

import { PlatformTopbar } from "@/components/shared/PlatformTopbar";
import { useAuth } from "@/core/hooks/useAuth";
import { publicRoutes } from "@/core/models/routes.model";
import FoodieDashboard from "@/modules/restaurants/components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (() => {
      if (!user) {
        router.push(publicRoutes.signIn);
      }
      console.log(user);
    })();
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <PlatformTopbar />
      <FoodieDashboard />
    </div>
  );
}
