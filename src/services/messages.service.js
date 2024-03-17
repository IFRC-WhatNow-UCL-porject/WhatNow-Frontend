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

const API_URL = "http://localhost:5000/api/messages";

const get_all_societies = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/get_all_societies", values, { headers: { "Authorization": `Bearer ${token}` } })
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

  const get_published_region = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/get_published_region", values, { headers: { "Authorization": `Bearer ${token}` } })
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

  const get_region_content = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/get_region_content", values, { headers: { "Authorization": `Bearer ${token}` } })
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
  }

  const get_society_and_region_name = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/get_society_and_region_name", values, { headers: { "Authorization": `Bearer ${token}` } })
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

  const MessagesService = {
    get_all_societies,
    get_language,
    get_published_region,
    get_region_content,
    get_content_message,
    get_society_and_region_name
  };
  
  export default MessagesService;