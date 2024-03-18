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

const API_URL = BASE_URL + "/api/users";

const get_all_users = async () => {
    updateToken();
    return await axios.post(API_URL + "/get_users", { headers: { "Authorization": `Bearer ${token}` } })
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

const get_user_role = async () => {
    updateToken();
    return await axios.post(API_URL + "/get_user_role", { headers: { "Authorization": `Bearer ${token}` } })
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

const get_user_society = async () => {
    updateToken();
    return await axios.post(API_URL + "/get_user_society", { headers: { "Authorization": `Bearer ${token}` } })
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

const send_activation_email = async (values) => {
  return await axios.post(API_URL + "/send_activation_email", values).then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
}

const change_status = async (values) => {
  return await axios.post(API_URL + "/change_status", values).then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
}

const create_profile = async (values) => {
  return await axios.post(API_URL + "/create_profile", values).then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
}


const userService = {
    get_all_users,
    get_user_role,
    get_user_society,
    send_activation_email,
    change_status,
    create_profile
};
  
export default userService;