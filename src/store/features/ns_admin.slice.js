import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import auditLogSerivce from '../../services/auditLog.service';
import bulkUploadService from '../../services/bulkUpload.service';
import contentService from '../../services/content.service';
import contentMessageService from '../../services/contentMessage.service';
import regionService from '../../services/region.service';
import languageService from '../../services/language.service';
import publishService from '../../services/publish.service';
import societyService from '../../services/society.service';

export const get_language = createAsyncThunk(
    "ns_admin/get_language",
    async (values, thunkAPI) => {
      try {
        const result = await languageService.get_language(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const add_language = createAsyncThunk(
    "ns_admin/add_language",
    async (values, thunkAPI) => {
      try {
        const result = await languageService.add_language(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const update_language = createAsyncThunk(
    "ns_admin/update_language",
    async (values, thunkAPI) => {
      try {
        const result = await languageService.update_language(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const get_region = createAsyncThunk(
    "ns_admin/get_region",
    async (values, thunkAPI) => {
      try {
        const response = await regionService.get_region(values);
        return response;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const add_region = createAsyncThunk(
    "ns_admin/add_region",
    async (values, thunkAPI) => {
      try {
        const result = await regionService.add_region(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const check_region = createAsyncThunk(
    "ns_admin/check_region",
    async (values, thunkAPI) => {
      try {
        const result = await regionService.check_region(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
)

export const update_region = createAsyncThunk(
    "ns_admin/update_region",
    async (values, thunkAPI) => {
      try {
        const result = await regionService.update_region(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const delete_region = createAsyncThunk(
    "ns_admin/delete_region",
    async (values, thunkAPI) => {
      try {
        const result = await regionService.delete_region(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const init_content = createAsyncThunk(
    "ns_admin/init_content",
    async (values, thunkAPI) => {
      try {
        const result = await contentService.init_content(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const get_content = createAsyncThunk(
    "ns_admin/get_content",
    async (values, thunkAPI) => {
      try {
        const result = await contentService.get_content(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const get_contentIds_under_region = createAsyncThunk(
    "ns_admin/get_contentIds_under_region",
    async (values, thunkAPI) => {
      try {
        const result = await contentService.get_contentIds_under_region(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const add_content = createAsyncThunk(
    "ns_admin/add_content",
    async (values, thunkAPI) => {
      try {
        const result = await contentService.add_content(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const get_content_message = createAsyncThunk(
    "ns_admin/get_content_message",
    async (values, thunkAPI) => {
      try {
        const result = await contentMessageService.get_content_message(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const update_content = createAsyncThunk(
    "ns_admin/update_content",
    async (values, thunkAPI) => {
      try {
        const result = await contentService.update_content(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const update_content_message = createAsyncThunk(
    "ns_admin/update_content_message",
    async (values, thunkAPI) => {
      try {
        const result = await contentMessageService.update_content_message(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const is_content_init = createAsyncThunk(
    "ns_admin/is_content_init",
    async (values, thunkAPI) => {
      try {
        const result = await bulkUploadService.is_content_init(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const delete_content = createAsyncThunk(
    "ns_admin/delete_content",
    async (values, thunkAPI) => {
      try {
        const result = await contentService.delete_content(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const get_existed_content_type = createAsyncThunk(
    "ns_admin/get_existed_content_type",
    async (values, thunkAPI) => {
      try {
        const result = await contentService.get_existed_content_type(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const get_content_by_id = createAsyncThunk(
    "ns_admin/get_content_by_id",
    async (values, thunkAPI) => {
      try {
        const result = await contentService.get_content_by_id(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const get_audit_log = createAsyncThunk(
    "ns_admin/get_audit_log",
    async (values, thunkAPI) => {
      try {
        const result = await auditLogSerivce.get_audit_log(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const publish = createAsyncThunk(
    "ns_admin/publish",
    async (values, thunkAPI) => {
      try {
        const result = await publishService.publish(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const stop_publish = createAsyncThunk(
    "ns_admin/unpublish",
    async (values, thunkAPI) => {
      try {
        const result = await publishService.stop_publish(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

export const get_user_societies = createAsyncThunk(
    "ns_admin/get_user_societies",
    async (values, thunkAPI) => {
      try {
        const result = await societyService.get_user_societies(values);
        return result;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({});
      }
    }
  );

const initialState = {

};

const adminSlice = createSlice({
    name: "ns_admin",
    initialState,
    reducers: {

    },
    extraReducers: {

    },
});

export const { } = adminSlice.actions;

const { reducer } = adminSlice;
export default reducer;