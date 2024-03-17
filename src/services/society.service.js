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

const API_URL = "http://localhost:5000/api/society";

const get_user_societies = async (values) => {
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
  };

const get_all_societies = async () => {
  updateToken();
  return await axios.post(API_URL + "/get_all_societies", { headers: { "Authorization": `Bearer ${token}` } })
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

const societyService = {
    get_user_societies,
    get_all_societies
};

export default societyService;