import axios, { AxiosInstance } from "axios";
import HttpClient from "./HttpClient";

export default class HttpClientAdapter implements HttpClient {
  private axiosInstance: AxiosInstance | null = null;

  constructor() {
    const baseURL = "http://localhost:89/";
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get(url: string, configs?: object | undefined): Promise<any> {
    return await this.axiosInstance?.get(url, configs);
  }
  async post(
    url: string,
    body: object,
    configs?: object | undefined
  ): Promise<any> {
    return await this.axiosInstance?.post(url, body, configs);
  }
  async put(
    url: string,
    body: object,
    configs?: object | undefined
  ): Promise<any> {
    return await this.axiosInstance?.put(url, body, configs);
  }
  async delete(url: string, configs?: object | undefined): Promise<any> {
    return await this.axiosInstance?.delete(url, configs);
  }
}
