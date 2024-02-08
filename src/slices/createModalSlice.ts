import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CreateModalState {
  isOpen: boolean;
  defaultId: string;
}

const initialState: CreateModalState = {
  isOpen: false,
  defaultId: "",
};

export const createModalSlice = createSlice({
  name: "createModal",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    setDefaultId: (state, action: PayloadAction<string>) => {
      state.defaultId = action.payload;
    },
    deleteDefaultId: (state) => {
      state.defaultId = "";
    },
  },
});

export const { onOpen, onClose, setDefaultId, deleteDefaultId } =
  createModalSlice.actions;

export default createModalSlice.reducer;
