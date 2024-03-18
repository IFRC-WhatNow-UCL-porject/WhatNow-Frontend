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

const API_URL = BASE_URL + "/api/contentMessage";

  const get_content_message = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/get_content_message", values, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        console.log(response.data)
        const data = response.data;
        return data;
      }).catch((error) => {
        console.log(error.response.data)
        const response = error.response.data;
        return response;
      });
  };

  const update_content_message = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/update_content_message", values, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        console.log(response.data)
        const data = response.data;
        return data;
      }).catch((error) => {
        console.log(error.response.data)
        const response = error.response.data;
        return response;
      });
  };

const contentMessageService = {
    get_content_message,
    update_content_message,
};

export default contentMessageService;