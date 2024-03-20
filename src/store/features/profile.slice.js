import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ProfileService from "../../services/profile.service";

export const changePassword = createAsyncThunk(
    "profile/changePassword",
    async (values, thunkAPI) => {
        try {
            const response = await ProfileService.change_password(values);
            return response;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({});
        }
    }
);

export const getUserInfo = createAsyncThunk(
    "profile/getUserInfo",
    async (values, thunkAPI) => {
        try {
            const response = await ProfileService.get_user_info(values);
            return response;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({});
        }
    }
);

export const updateUserInfo = createAsyncThunk(
    "profile/updateUserInfo",
    async (values, thunkAPI) => {
        try {
            const response = await ProfileService.update_user_info(values);
            return response;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({});
        }
    }
);

export const getUserSociety = createAsyncThunk(
    "profile/getUserSociety",
    async (values, thunkAPI) => {
        try {
            const response = await ProfileService.get_user_society(values);
            return response;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({});
        }
    }
);

export const getUserRole = createAsyncThunk(
    "profile/getUserRole",
    async (values, thunkAPI) => {
        try {
            const response = await ProfileService.get_user_role(values);
            return response;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({});
        }
    }
);

export const update_term_agree = createAsyncThunk(
    "profile/updateTermAgree",
    async (values, thunkAPI) => {
        try {
            const response = await ProfileService.update_term_agree(values);
            return response;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({});
        }
    }
);


const initialState = {

};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {

  },
  extraReducers: {

  },
});

export const { } = profileSlice.actions;

export default profileSlice.reducer;