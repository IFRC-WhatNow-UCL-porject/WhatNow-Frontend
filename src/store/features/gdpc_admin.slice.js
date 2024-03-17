import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userService from '../../services/user.service';
import societyService from '../../services/society.service';
import apiService from "../../services/api.service";
import apiUserService from "../../services/apiUser.service";
import termService from "../../services/term.service";

export const get_all_users = createAsyncThunk(
    "ns_admin/get_all_users",
    async (thunkAPI) => {
      try {
        const result = await userService.get_all_users();
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const get_user_role = createAsyncThunk(
    "ns_admin/get_user_role",
    async (thunkAPI) => {
      try {
        const result = await userService.get_user_role();
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const get_user_society = createAsyncThunk(
    "ns_admin/get_user_society",
    async (thunkAPI) => {
      try {
        const result = await userService.get_user_society();
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const get_all_societies = createAsyncThunk(
    "ns_admin/get_all_societies",
    async (thunkAPI) => {
      try {
        const result = await societyService.get_all_societies();
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const get_user_societies = createAsyncThunk(
    "ns_admin/get_user_societies",
    async (thunkAPI) => {
      try {
        const result = await societyService.get_user_societies();
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const sendActivationEmail = createAsyncThunk("auth/sendActivationEmail", async (values, thunkAPI) => {
  try {
    const result = await userService.send_activation_email(values);
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

export const changeStatus = createAsyncThunk("profile/changeStatus", async (values, thunkAPI) => {
  try {
      const response = await userService.change_status(values);
      return response;
  } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({});
  }
});

export const createProfile = createAsyncThunk("profile/createProfile", async (values, thunkAPI) => {
  try {
      const response = await userService.create_profile(values);
      return response;
  } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({});
  }
});

export const get_apis = createAsyncThunk("gdpc_admin/get_apis", async (thunkAPI) => {
  try {
    const result = await apiService.get_apis();
    return result;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue({});
  }
});

export const get_api_users = createAsyncThunk("gdpc_admin/get_api_users", async (thunkAPI) => {
  try {
    const result = await apiUserService.get_api_users();
    return result;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue({});
  }
});

export const get_term_by_version = createAsyncThunk("term/get_term_by_version", async (values, thunkAPI) => {
  try {
    const result = await termService.get_term_by_version(values);
    return result;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue({});
  }
});

export const publish_term = createAsyncThunk("term/publish_term", async (values, thunkAPI) => {
  try {
    const result = await termService.publish_term(values);
    return result;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue({});
  }
});

export const get_all_terms_versions = createAsyncThunk("term/get_all_terms_versions", async (thunkAPI) => {
  try {
    const result = await termService.get_all_versions();
    return result;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue({});
  }
});

const initialState = {

};

const userSlice = createSlice({
    name: "gdpc_admin",
    initialState,
    reducers: {

    },
    extraReducers: {

    },
});

export const { } = userSlice.actions;

const { reducer } = userSlice;
export default reducer;