import petSlice from "@/slices/petSlice";
import alertSlice from "@/slices/alertSlice";
import filterSlice from "@/slices/filterSlice";
import createModalSlice from "@/slices/createModalSlice";
import deleteModalSlice from "@/slices/deleteModalSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    pet: petSlice,
    alert: alertSlice,
    filter: filterSlice,
    createModal: createModalSlice,
    deleteModal: deleteModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
