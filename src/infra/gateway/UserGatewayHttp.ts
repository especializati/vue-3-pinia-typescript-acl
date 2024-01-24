import User from "../../entities/User";
import httpAdapter from "../http/HttpClientAdapter";

export default class UserGatewayHttp {
  async login(email: string, password: string): Promise<User> {
    const device_name = `vue_app${navigator.userAgent}`;
    return await httpAdapter.post("/auth", {
      email,
      password,
      device_name,
    });
  }
}
