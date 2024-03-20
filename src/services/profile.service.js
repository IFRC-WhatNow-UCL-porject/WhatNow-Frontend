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

const API_URL = BASE_URL + "/api/profile";

const change_password = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/change_password", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const get_user_info = async (values) => {
  updateToken();
  return await axios.post(API_URL + "/get_profile", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const update_user_info = async (values) => {
  updateToken();
  return await axios.post(API_URL + "/update_profile", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const get_user_society = async (values) => {
  updateToken();
  return await axios.post(API_URL + "/get_user_societies", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const get_user_role = async (values) => {
  updateToken();
  return await axios.post(API_URL + "/get_user_role", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const update_term_agree = async (values) => {
  updateToken();
  return await axios.post(API_URL + "/update_term_agree", values, { headers: { "Authorization": `Bearer ${token}` } })
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

  const ProfileService = {
    change_password,
    get_user_info,
    update_user_info,
    get_user_society,
    get_user_role,
    update_term_agree
  };
  
  export default ProfileService;