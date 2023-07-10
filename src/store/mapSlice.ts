import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoordinatesType, MapObjectType } from './types';

type MapObjectsType = {
  mapObjects: MapObjectType[];
  coordinates: CoordinatesType;
  isLoading: boolean;
};

const initialState: MapObjectsType = {
  mapObjects: [],
  coordinates: [],
  isLoading: true,
};

const mapObjectsSlice = createSlice({
  name: 'mapObjects',
  initialState,
  reducers: {
    setMapObjects: (state: MapObjectsType, action) => {
      state.mapObjects = action.payload;
    },
    addMapObject: (
      state: MapObjectsType,
      action: PayloadAction<MapObjectType>
    ) => {
      state.mapObjects.push(action.payload);
    },
    setCoordinates: (state: MapObjectsType, action) => {
      state.coordinates = action.payload;
    },
  },
});

export const { setMapObjects, addMapObject, setCoordinates } =
  mapObjectsSlice.actions;
export const mapObjectReducer = mapObjectsSlice.reducer;
