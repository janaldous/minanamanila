import axios from "axios";
import { BASE_PATH } from "./runtime";

export default class LoginApi {
  static login(username: string, password: string): Promise<any> {
    return axios.get(`${BASE_PATH}/admin/login`, {
      headers: { Authorization: LoginApi.createBasicAuthToken(username, password) },
      withCredentials: true,
    });
  }

  static createBasicAuthToken(username, password) {
    return "Basic " + window.btoa(username + ":" + password);
  }
}
