import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface DeleteModalState {
  isOpen: boolean;
  defaultId: string;
}

const initialState: DeleteModalState = {
  isOpen: false,
  defaultId: "",
};

export const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    onDeleteOpen: (state) => {
      state.isOpen = true;
    },
    onDeleteClose: (state) => {
      state.isOpen = false;
    },
    setDeleteDefaultId: (state, action: PayloadAction<string>) => {
      state.defaultId = action.payload;
    },
    deleteDeleteDefaultId: (state) => {
      state.defaultId = "";
    },
  },
});

export const {
  onDeleteOpen,
  onDeleteClose,
  setDeleteDefaultId,
  deleteDeleteDefaultId,
} = deleteModalSlice.actions;

export default deleteModalSlice.reducer;
