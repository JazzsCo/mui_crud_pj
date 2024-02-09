import { createSlice } from "@reduxjs/toolkit";

interface AlertSlice {
  createOpen: boolean;
  updateOpen: boolean;
  deleteOpen: boolean;
}

const initialState: AlertSlice = {
  createOpen: false,
  updateOpen: false,
  deleteOpen: false,
};

export const alertSlice = createSlice({
  name: "createModal",
  initialState,
  reducers: {
    onOpenCreate: (state) => {
      state.createOpen = true;
    },
    onCloseCreate: (state) => {
      state.createOpen = false;
    },
    onOpenUpdate: (state) => {
      state.updateOpen = true;
    },
    onCloseUpdate: (state) => {
      state.updateOpen = false;
    },
    onOpenDelete: (state) => {
      state.deleteOpen = true;
    },
    onCloseDelete: (state) => {
      state.deleteOpen = false;
    },
  },
});

export const {
  onOpenCreate,
  onCloseCreate,
  onOpenUpdate,
  onCloseUpdate,
  onOpenDelete,
  onCloseDelete,
} = alertSlice.actions;

export default alertSlice.reducer;
