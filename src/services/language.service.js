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

const API_URL = BASE_URL + "/api/language";

const get_language = async (values) => {
    updateToken();
    const { society_id } = values;
    return await axios.post(API_URL + "/get_language", {
      society_id: society_id,
    }, { headers: { "Authorization": `Bearer ${token}` } })
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
  
  const add_language = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/add_language", values
      , { headers: { "Authorization": `Bearer ${token}` } })
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
  
  const update_language = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/update_language", values
      , { headers: { "Authorization": `Bearer ${token}` } })
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

const languageService = {
    get_language,
    add_language,
    update_language,
};

export default languageService;