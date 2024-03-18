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

const API_URL = BASE_URL + "/api/region";

  const get_region = async (values) => {
    updateToken();
    const { society_id, language_code } = values;
    return await axios.post(API_URL + "/get_region", {
      society_id: society_id,
      language_code: language_code,
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
  
  const add_region = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/add_region", values, { headers: { "Authorization": `Bearer ${token}` } })
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
  
  const check_region = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/check_region", values, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        return data;
      }).catch((error) => {
        console.log(error.response.data);
        const response = error.response.data;
        return response;
      });
  };
  
  const update_region = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/update_region", values, { headers: { "Authorization": `Bearer ${token}` } })
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
  
  const delete_region = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/delete_region", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const auditLogService = {
    get_region,
    add_region,
    check_region,
    update_region,
    delete_region,
};

export default auditLogService;