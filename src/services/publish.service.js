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

const API_URL = BASE_URL + "/api/publish";

  const publish = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/publish", values, { headers: { "Authorization": `Bearer ${token}` } })
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
  
  const stop_publish = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/stop_publish", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const publishService = {
    publish,
    stop_publish,
};

export default publishService;