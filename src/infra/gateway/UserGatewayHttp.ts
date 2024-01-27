import User from "@/entities/User";
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

  async getMe(): Promise<User> {
    const token = localStorage.getItem(NAME_TOKEN)
    const response = await httpAdapter.get('/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const { id, name, email } = response.data.data
    return new User(id, name, email)
  }
}
