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

const API_URL = BASE_URL + "/api/term";

const get_term_by_version = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/get_term_by_version", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const publish_term = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/publish_term", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const get_all_versions = async () => {
    updateToken();
    return await axios.post(API_URL + "/get_all_versions", { headers: { "Authorization": `Bearer ${token}` } })
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

const get_latest_term = async () => {
    updateToken();
    return await axios.post(API_URL + "/get_latest_term", { headers: { "Authorization": `Bearer ${token}` } })
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


const termService = {
    get_term_by_version,
    publish_term,
    get_all_versions,
    get_latest_term
};
  
export default termService;