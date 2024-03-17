import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import MessagesService from "../../services/messages.service";

export const get_all_societies = createAsyncThunk(
  "messages/get_all_societies",
  async (values, thunkAPI) => {
    try {
      const result = await MessagesService.get_all_societies(values);
      return result;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue({});
    }
  }
);

export const get_society_and_region_name = createAsyncThunk(
  "messages/get_society_and_region_name",
  async (values, thunkAPI) => {
    try {
      const result = await MessagesService.get_society_and_region_name(values);
      return result;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({});
    }
  }
);

export const get_language = createAsyncThunk(
  "messages/get_language",
  async (values, thunkAPI) => {
    try {
      const result = await MessagesService.get_language(values);
      return result;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({});
    }
  }
);

export const get_published_region = createAsyncThunk(
  "messages/get_published_region",
  async (values, thunkAPI) => {
    try {
      const result = await MessagesService.get_published_region(values);
      return result;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({});
    }
  }
);

export const get_region_content = createAsyncThunk(
  "messages/get_region_content",
  async (values, thunkAPI) => {
    try {
      const result = await MessagesService.get_region_content(values);
      return result;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({});
    }
  }
);

export const get_content_message = createAsyncThunk(
  "messages/get_content_message",
  async (values, thunkAPI) => {
    try {
      const result = await MessagesService.get_content_message(values);
      return result;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({});
    }
  }
);

const initialState = {

};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {

  },
  extraReducers: {

  },
});

export const { } = messagesSlice.actions;

export default messagesSlice.reducer;