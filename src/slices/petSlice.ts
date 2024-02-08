import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Data {
  id: string;
  name: string;
  status: string;
  pawrent: string;
  breed: string;
  gender: string;
  birthday: string;
  phone: string;
  township: string;
  city: string;
  address: string;
}

interface PetState {
  isLoading: boolean;
  data: Array<Data>;
  error: string;
}

const initialState: PetState = {
  isLoading: false,
  data: [],
  error: "",
};

export const getData = createAsyncThunk("getData", async () => {
  const res = await axios.get("/api/data");
  return res.data;
});

export const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.error = "";
    });
  },
});

export default petSlice.reducer;
