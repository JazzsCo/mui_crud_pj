import petSlice from "@/slices/petSlice";
import alertSlice from "@/slices/alertSlice";
import createModalSlice from "@/slices/createModalSlice";
import deleteModalSlice from "@/slices/deleteModalSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    pet: petSlice,
    createModal: createModalSlice,
    deleteModal: deleteModalSlice,
    alert: alertSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
