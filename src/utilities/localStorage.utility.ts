export function setLocalStorageItem<T>(key: string, value: T): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getLocalStorageItem<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function removeLocalStorageItem(key: string): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}

export function updateLocalStorageItem<T>(
  key: string,
  value: Partial<T>
): void {
  if (typeof window !== "undefined") {
    const existing = getLocalStorageItem<T>(key);
    const updated = { ...existing, ...value };
    setLocalStorageItem(key, updated);
  }
}
