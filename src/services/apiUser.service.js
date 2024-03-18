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

const API_URL = BASE_URL + "/api/apiUsers";

const get_api_users = async () => {
  updateToken();
  return await axios.post(API_URL + "/get_api_users", { headers: { "Authorization": `Bearer ${token}` } })
    .then((response) => {
      console.log(response.data)
      const data = response.data;
      return data;
    }).catch((error) => {
      console.log(error.response.data)
      const response = error.response.data;
      return response;
    });
}

const add_api_user = async (data) => {
  updateToken();
  return await axios.post(API_URL + "/add_api_user", data, { headers: { "Authorization": `Bearer ${token}` } })
    .then((response) => {
      console.log(response.data)
      const data = response.data;
      return data;
    }).catch((error) => {
      console.log(error.response.data)
      const response = error.response.data;
      return response;
    });
}

const apiUserService = {
  get_api_users
};
  
export default apiUserService;