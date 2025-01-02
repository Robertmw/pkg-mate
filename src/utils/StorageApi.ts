import { isEmpty } from "lodash";

export const StorageApi = {
  async setItem<T>(key: string, value: T) {
    return window.electronAPI.storageSet(key, value);
  },
  async getItem<T>(key: string): Promise<T> {
    const value = await window.electronAPI.storageGet(key);

    if (isEmpty(value)) {
      return null;
    }

    return value;
  },
};
