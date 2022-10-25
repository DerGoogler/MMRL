import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();
export function useNativeStorage<T>(key: string, defaultValue: T) {
  return useMMKVStorage<T>(key, storage, defaultValue);
}
