import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../../services/auth.service";
import TermService from "../../services/term.service";

export const register = createAsyncThunk(
  "auth/register",
  async (values, thunkAPI) => {
    try {
      const result = await AuthService.register(values);
      return result;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue({});
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const result = await AuthService.login({ email, password });
      return result;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue({});
    }
  }
);

export const checkLogInfo = createAsyncThunk("auth/check_user_login_info", async ({ email, password }, thunkAPI) => {
  try {
    const result = await AuthService.checkLogInfo({ email, password });
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

export const checkLogStatus = createAsyncThunk("auth/check_user_login_status", async (thunkAPI) => {
  try {
    const result = await AuthService.checkLogStatus();
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const result = await AuthService.logout();
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

export const checkUserRole = createAsyncThunk("auth/check_user_role", async (thunkAPI) => {
  try {
    const result = await AuthService.check_user_role();
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

export const googleCheckEmail = createAsyncThunk("auth/google_check_email", async (values, thunkAPI) => {
  try {
    const result = await AuthService.google_check_email(values);
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

export const check_email_exist = createAsyncThunk("auth/check_email_exist", async (values, thunkAPI) => {
  try {
    const result = await AuthService.check_email_exist(values);
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

export const addApiUser = createAsyncThunk("auth/add_api_user", async (values, thunkAPI) => {
  try {
    const result = await AuthService.add_api_user(values);
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

export const get_latest_term = createAsyncThunk("auth/get_latest_term", async (thunkAPI) => {
  try {
    const result = await TermService.get_latest_term();
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

export const check_email_token = createAsyncThunk("auth/check_email_token", async (values, thunkAPI) => {
  try {
    const result = await AuthService.check_email_token(values);
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

export const reset_password = createAsyncThunk("auth/reset_password", async (values, thunkAPI) => {
  try {
    const result = await AuthService.reset_password(values);
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

export const send_reset_password_email = createAsyncThunk("auth/send_reset_password_email", async (values, thunkAPI) => {
  try {
    const result = await AuthService.send_reset_password_email(values);
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

export const send_activation_email = createAsyncThunk("auth/send_activation_email", async (values, thunkAPI) => {
  try {
    const result = await AuthService.send_activation_email(values);
    return result;
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({});
  }
});

const initialState = {
  
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: {

  },
});

export const { } = authSlice.actions;

const { reducer } = authSlice;
export default reducer;