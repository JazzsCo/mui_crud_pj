import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FilterSlice {
  searchValue: string;
  status: string;
  breed: string;
}

const initialState: FilterSlice = {
  searchValue: "",
  status: "default_value",
  breed: "default_value",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setBreed: (state, action: PayloadAction<string>) => {
      state.breed = action.payload;
    },
  },
});

export const { setSearchValue, setStatus, setBreed } = filterSlice.actions;

export default filterSlice.reducer;
