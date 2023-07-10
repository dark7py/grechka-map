import { store } from './store';

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type CoordinatesType = [number, number] | null;
export type MapObjectType = {
  coordinates: CoordinatesType;
  header: string;
  description: string;
};
