import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import apiService from '../../services/api.service';

export const get_apis = createAsyncThunk(
    "ns_admin/get_apis",
    async (thunkAPI) => {
      try {
        const result = await apiService.get_apis();
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const add_api = createAsyncThunk(
    "ns_admin/add_api",
    async (values, thunkAPI) => {
      try {
        console.log(values)
        const result = await apiService.add_api(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const update_api = createAsyncThunk(
    "ns_admin/update_api",
    async (values, thunkAPI) => {
      try {
        console.log(values)
        const result = await apiService.update_api(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const delete_api = createAsyncThunk(
    "ns_admin/delete_api",
    async (values, thunkAPI) => {
      try {
        console.log(values)
        const result = await apiService.delete_api(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

const initialState = {

};

const userSlice = createSlice({
    name: "api_user",
    initialState,
    reducers: {

    },
    extraReducers: {

    },
});

export const { } = userSlice.actions;

const { reducer } = userSlice;
export default reducer;