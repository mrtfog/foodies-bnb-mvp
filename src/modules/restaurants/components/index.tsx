import { Card } from "@/components/ui/card";
import useSWR from "swr";
import { Restaurant } from "../models/Restaurant";
import { getAllRestaurants } from "../services/restaurants.service";
import RestaurantCard from "./RestaurantCard";

const fetcher = async () => await getAllRestaurants();

const FoodieDashboard = () => {
  const {
    data: restaurants,
    error,
    isLoading,
  } = useSWR("restaurants", fetcher);

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

      {isLoading && (
        <div className="text-center text-gray-500">
          Cargando restaurantes...
        </div>
      )}
      {error && (
        <div className="text-center text-red-500">
          Error al cargar restaurantes
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants &&
          restaurants.length > 0 &&
          restaurants.map((restaurant: Restaurant) => (
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
