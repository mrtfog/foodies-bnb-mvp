import React from "react";
import { Card } from "@/components/ui/card";
import RestaurantCard from "./RestaurantCard";
import { Restaurant } from "../models/Restaurant";

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "El Ristorante de la Bella Vista",
    description:
      "Autentico restaurante italiano con pasta casera y pizzas al horno en un ambiente elegante.",
    image: "/placeholder.svg",
    cuisine: "Italiano",
    rating: 4.8,
  },
  {
    id: 2,
    name: "El Jardín de los Sushis",
    description:
      "Experiencia culinaria japonesa tradicional con sushi fresco, sashimi y menús kaiseki estacionales.",
    image: "/placeholder.svg",
    cuisine: "Japonés",
    rating: 4.9,
  },
  {
    id: 3,
    name: "El Palacio de los Sabores",
    description:
      "Bistro francés moderno que ofrece interpretaciones contemporáneas de platos clásicos con ingredientes locales.",
    image: "/placeholder.svg",
    cuisine: "Francés",
    rating: 4.7,
  },
];

const FoodieDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Descubre Restaurantes Increíbles
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experiencias culinarias seleccionadas de todo el mundo, curadas solo
          para ti
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <Card className="inline-block p-6 bg-gradient-to-r from-orange-100 to-red-100 border-orange-200">
          <p className="text-gray-700 font-medium">
            ¿No encuentras lo que buscas?
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Más restaurantes se añaden cada día. ¡Vuelve pronto! 🌟
          </p>
        </Card>
      </div>
    </div>
  );
};

export default FoodieDashboard;
