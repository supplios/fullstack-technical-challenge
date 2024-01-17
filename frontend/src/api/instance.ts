import Axios from "axios";

class AxiosAuth {
  public axiosInstance = Axios.create();

  constructor() {
    this.axiosInstance.interceptors.request.use(async (config) => {
      console.log(config.url);
      if (config?.url?.indexOf("/api") !== -1) {
        config.baseURL = "http://localhost:3001";
      }
      return config;
    });
  }
}

export const axiosAuth = new AxiosAuth();
