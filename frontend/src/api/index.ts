import { axiosAuth } from "./instance";
import { AxiosInstance } from "axios";
import { CarsApiFactory, Configuration } from "../api-types";

const args: [Configuration, string, AxiosInstance] = [
  null,
  "",
  axiosAuth.axiosInstance,
];

export const carsApi = CarsApiFactory(...args);
