import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Restaurant {
  id: number;
  name: string;
  description: string;
  image: string;
  cuisine: string;
  rating: number;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const handleSelect = () => {
    console.log(`Selected restaurant: ${restaurant.name}`);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border border-gray-200">
      <div className="relative overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className="bg-white/90 text-gray-800 shadow-sm"
          >
            {restaurant.cuisine}
          </Badge>
        </div>
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-1 bg-white/90 rounded-full px-3 py-1 shadow-sm">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="text-sm font-semibold text-gray-800">
              {restaurant.rating}
            </span>
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
          {restaurant.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
        <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
          {restaurant.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="pt-4 border-t border-gray-100">
        <Button
          onClick={handleSelect}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Select Restaurant
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
