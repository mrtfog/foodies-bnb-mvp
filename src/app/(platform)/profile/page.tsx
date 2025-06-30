"use client";
import { useAuth } from "@/core/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">
        Perfil de {user?.email}
      </h1>

      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Información de tu cuenta
            </h2>
            <div className="mt-4">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
