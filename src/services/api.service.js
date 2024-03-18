import axios from "axios";

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

const API_URL = "http://localhost:5000/api/apps";

const get_apis = async () => {
    updateToken();
    return await axios.post(API_URL + "/get_apis", { headers: { "Authorization": `Bearer ${token}` } })
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

const add_api = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/add_api", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const update_api = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/update_api", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const delete_api = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/delete_api", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const get_apis_by_user_id = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/get_apis_by_user_id", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const apiService = {
    get_apis,
    add_api,
    update_api,
    delete_api,
    get_apis_by_user_id
};
  
export default apiService;