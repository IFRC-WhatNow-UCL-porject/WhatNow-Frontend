import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import SocietyService from "../../services/society.service";

export const get_user_societies = createAsyncThunk(
    "messages/get_user_societies",
    async (values, thunkAPI) => {
        try {
        const result = await MessagesService.get_user_societies(values);
        return result;
        } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue({});
        }
    }
    );

export const get_all_societies = createAsyncThunk(
    "society/get_all_societies",
    async (values, thunkAPI) => {
        try {
        const result = await SocietyService.get_all_societies(values);
        return result;
        } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue({});
        }
    }
    );


const initialState = {

};

const societySlice = createSlice({
  name: "society",
  initialState,
  reducers: {

  },
  extraReducers: {

  },
});

export const { } = societySlice.actions;

export default societySlice.reducer;