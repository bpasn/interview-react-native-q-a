import App from '@/App';
import { AppRegistry } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';
import {expo} from '../app.json';

export const storage = new MMKV({
    id: "boards-store"
});

export const zustandStorage: StateStorage = {
    setItem: (name: string, value: string) => storage.set(name, value),
    getItem: (name: string) => storage.getString(name) ?? null,
    removeItem: (name: string) => storage.delete(name)
};

AppRegistry.registerComponent(expo.name, () => App);

export default storage;