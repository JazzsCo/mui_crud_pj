import petSlice from "@/slices/petSlice";
import createModalSlice from "@/slices/createModalSlice";
import deleteModalSlice from "@/slices/deleteModalSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    pet: petSlice,
    createModal: createModalSlice,
    deleteModal: deleteModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
