"use client";

import { useAuth } from "@/core/hooks/useAuth";
import { useEffect } from "react";
import { publicRoutes } from "@/core/models/routes.model";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(publicRoutes.signIn);
    }
  }, [user, router]);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1>Hello World</h1>
      </div>
    </div>
  );
}
