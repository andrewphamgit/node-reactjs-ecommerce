import axiosClient from "../common/axios-client.js";

class LoginService {

  static login({userName, password}) {
    return axiosClient.post(`/user/admin-login`, {userName, password});
  }

}

export default LoginService;