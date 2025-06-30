import useSWR from "swr";
import { getUser } from "../services/auth.service";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "@/utilities/localStorage.utility";
import { User } from "@supabase/supabase-js";
import type { MutatorCallback, MutatorOptions } from "swr";

const LOCAL_STORAGE_USER_KEY = "user";

export function useAuth() {
  const localUser =
    typeof window !== "undefined"
      ? getLocalStorageItem<User>(LOCAL_STORAGE_USER_KEY)
      : null;

  const {
    data: user,
    error,
    mutate: swrMutate,
  } = useSWR("user", getUser, {
    fallbackData: localUser,
    onSuccess: (data) => {
      if (data) setLocalStorageItem(LOCAL_STORAGE_USER_KEY, data);
    },
  });

  const mutate = async (
    data?:
      | User
      | Promise<User | null | undefined>
      | MutatorCallback<User | null>
      | null
      | undefined,
    options?: boolean | MutatorOptions<User | null>
  ) => {
    const updated = await swrMutate(data, options);
    if (updated) {
      setLocalStorageItem(LOCAL_STORAGE_USER_KEY, updated);
    } else {
      removeLocalStorageItem(LOCAL_STORAGE_USER_KEY);
    }
    return updated;
  };

  return { user, error, mutate };
}
