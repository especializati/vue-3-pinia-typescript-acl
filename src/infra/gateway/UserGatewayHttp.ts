import httpAdapter from "@/infra/http/HttpClientAdapter";
import { NAME_TOKEN } from "@/utils/constants";

export default class UserGatewayHttp {
  async login(email: string, password: string): Promise<any> {
    const device_name = `vue_app${navigator.userAgent}`;
    return await httpAdapter.post("/auth", {
      email,
      password,
      device_name,
    })
    .then((response) => localStorage.setItem(NAME_TOKEN, response.data.token));
  }
}
