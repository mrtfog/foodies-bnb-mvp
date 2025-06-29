import useSWR from "swr";
import { getUser } from "../services/auth.service";

export function useAuth() {
  const { data: user, error, mutate } = useSWR("user", getUser);
  return { user, error, mutate };
}
