import axios from "axios";
const SERVER_URL = "https://village-backend-finalproject.herokuapp.com/";
const register = (username, email, password) => {
  return axios.post(`${SERVER_URL}/signup`, {
    username,
    email,
    password,
  });
};
const login = (username, password) => {
  return axios
    .post(`${SERVER_URL}/signin`, {
      username,
      password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
