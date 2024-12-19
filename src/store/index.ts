import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import pricingSlice from '../Pages/Pricing/store/slice';

const store = configureStore({
  reducer: {
    pricing: pricingSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
