import useSWR from "swr";
import { getUser } from "../services/auth.service";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "@/utilities/localStorage.utility";

const LOCAL_STORAGE_USER_KEY = "user";

export function useAuth() {
  const localUser =
    typeof window !== "undefined"
      ? getLocalStorageItem<any>(LOCAL_STORAGE_USER_KEY)
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

  const mutate = async (...args: any[]) => {
    const updated = await swrMutate(...args);
    if (updated) {
      setLocalStorageItem(LOCAL_STORAGE_USER_KEY, updated);
    } else {
      removeLocalStorageItem(LOCAL_STORAGE_USER_KEY);
    }
    return updated;
  };

  return { user, error, mutate };
}
