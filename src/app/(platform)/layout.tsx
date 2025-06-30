"use client";

import { PlatformTopbar } from "@/components/shared/PlatformTopbar";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <PlatformTopbar />
      {children}
    </div>
  );
}
