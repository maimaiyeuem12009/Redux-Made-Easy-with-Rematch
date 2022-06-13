import axios from "axios";

const isReactNative =
  typeof navigator !== "undefined" && navigator.product === "ReactNative";

class ApiClient {
  constructor() {
    this.httpInstance = axios.create({
      baseURL: isReactNative ? "http://10.0.2.2:8000" : "http://localhost:8000",
    });
  }

  async get(url, params) {
    return this.httpInstance.get(url, { params });
  }

  async patch(url, body, params) {
    return this.httpInstance.patch(url, body, { params });
  }
}
export default ApiClient;
