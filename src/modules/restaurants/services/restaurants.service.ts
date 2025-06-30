import { supabase } from "@/core/api/supabase";

export async function getAllRestaurants() {
  try {
    const { data: restaurants, error } = await supabase
      .from("restaurants")
      .select("*");

    console.log("restaurants", restaurants);
    if (error) throw error;
    return restaurants;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
