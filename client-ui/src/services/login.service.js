import axiosClient from "../common/axios-client.js";

class LoginService {

  static login({userName, password}) {
    return axiosClient.post(`/user/login`, {userName, password});
  }

  static register({userName, password, email}) {
    return axiosClient.post(`/user/register`, {userName, password, email});
  }

}

export default LoginService;