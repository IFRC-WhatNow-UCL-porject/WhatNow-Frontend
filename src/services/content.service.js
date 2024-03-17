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

const API_URL = "http://localhost:5000/api/content";

const get_content = async (values) => {
    updateToken();
    const { society_id } = values;
    return await axios.post(API_URL + "/get_content", {
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

  const get_content_by_id = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/get_content_by_id", values, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        console.log(response.data)
        const data = response.data;
        return data;
      }).catch((error) => {
        console.log(error.response.data);
        const response = error.response.data;
        return response;
      });
  }

  const get_contentIds_under_region = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/get_contentIds", values, { headers: { "Authorization": `Bearer ${token}` } })
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

  const add_content = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/add_content", values, { headers: { "Authorization": `Bearer ${token}` } })
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

  const init_content = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/init_content", values, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        console.log(response.data)
        const data = response.data;
        return data;
      }).catch((error) => {
        console.log(error.response.data);
        const response = error.response.data;
        return response;
      });
  }

  const update_content = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/update_content", values, { headers: { "Authorization": `Bearer ${token}` } })
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

  const delete_content = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/delete_content", values, { headers: { "Authorization": `Bearer ${token}` } })
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

  const get_existed_content_type = async (values) => {
    updateToken();
    return await axios.post(API_URL + "/get_existed_content_type", values, { headers: { "Authorization": `Bearer ${token}` } })
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

const contentService = {
    get_content,
    get_content_by_id,
    get_contentIds_under_region,
    add_content,
    init_content,
    update_content,
    delete_content,
    get_existed_content_type,
};

export default contentService;