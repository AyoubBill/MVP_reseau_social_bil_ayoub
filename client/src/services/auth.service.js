import Axios from "axios";
const API_URL = "http://localhost:3000/api/auth/";

const register = (username, email, password) => {
    return Axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (email, password) => {
    return Axios
        .post(API_URL + "login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
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
    getCurrentUser
};

export default AuthService;