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

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
      localStorage.clear();
      localStorage.setItem("error", JSON.stringify(error.response));
    } else if (error.response && error.response.status === 500) {
      localStorage.setItem("error", 500);
      window.location.href = "/error";
    } else if (error.response && error.response.status === 502) {
      localStorage.setItem("error", 502);
      window.location.href = "/error";
    }
    return Promise.reject(error);
  }
);

const API_URL = "http://localhost:5000/api/auth";

const register = async (values) => {
  return axios.post(API_URL + "/register", values)
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

const login = async (values) => {
  const { email, password } = values;
  return await axios.post(API_URL + "/login", {
    email: email,
    password: password,
  }).then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
};

const checkLogInfo = async (values) => {
  const { email, password } = values;
  return await axios.post(API_URL + "/check_user_login_info", {
    email: email,
    password: password,
  }).then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error)
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
};

const checkLogStatus = async () => {
  updateToken();
  return await axios.post(API_URL + "/check_user_status").then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
}

const logout = async () => {
  updateToken();
  return await axios.post(API_URL + "/logout", {
    access_token: token,
  }).then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
};

const check_user_role = async () => {
  updateToken();
  return await axios.post(API_URL + "/check_user_role", {
    user_id: JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).uuid : null,
  }).then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
}

const google_check_email = async (values) => {
  return await axios.post(API_URL + "/oauth_check_email_exist", values).then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
}

const check_email_exist = async (values) => {
  return await axios.post(API_URL + "/check_email_exist", values).then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
}

const add_api_user = async (values) => {
  return await axios.post(API_URL + "/add_api_user", values).then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
}

const check_email_token = async (values) => {
  return await axios.post(API_URL + "/check_email_token", values).then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
}

const reset_password = async (values) => {
  return await axios.post(API_URL + "/reset_password", values).then((response) => {
    console.log(response.data)
    const data = response.data;
    return data;
  }).catch((error) => {
    console.log(error.response.data)
    const response = error.response.data;
    return response;
  });
}

const send_reset_password_email = async (values) => {
  return await axios.post(API_URL + "/send_reset_password_email", values).then((response) => {
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

const AuthService = {
  register,
  login,
  checkLogInfo,
  checkLogStatus,
  logout,
  check_user_role,
  google_check_email,
  check_email_exist,
  add_api_user,
  check_email_token,
  reset_password,
  send_reset_password_email,
  send_activation_email
}

export default AuthService;