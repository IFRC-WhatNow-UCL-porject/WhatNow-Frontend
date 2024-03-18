import axios from "axios";
import BASE_URL from "./base";

let token = null;

const updateToken = () => {
  token = localStorage.getItem("access_token");
}

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const API_URL = BASE_URL + "/api/bulkUpload";

const is_content_init = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/is_content_init", values, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        return data;
      }).catch((error) => {
        console.log(error.response.data);
        const response = error.response.data;
        return response;
      });
  }

const bulkUploadService = {
    is_content_init,
};

export default bulkUploadService;