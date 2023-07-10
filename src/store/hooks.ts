import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppState, AppDispatch } from './types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
