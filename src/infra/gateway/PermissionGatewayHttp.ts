import Permission from "@/entities/Permission";
import httpAdapter from "@/infra/http/HttpClientAdapter";
import { PAGINATION } from "@/types/pagination";

export default class PermissionGatewayHttp {
  async getPaginate(
    page: number = 1,
    filter: string = "",
    totalPerPage: number = 15
  ): Promise<{ permissions: Permission[]; meta: PAGINATION }> {
    const response = await httpAdapter
      .withAuthorization()
      .get(
        `/permissions?page=${page}&filter=${filter}&total_per_page=${totalPerPage}`
      );
    const permissionsData = response.data.data;
    const permissions: Permission[] = permissionsData.map((permissionData: any) => {
      const { id, name, email } = permissionData;
      return new Permission(id, name, email);
    });
    return { permissions, meta: { ...response.data.meta } };
  }

  async create(params: object): Promise<Permission> {
    const response = await httpAdapter
      .withAuthorization()
      .post("/permissions", params);
    const { id, name, email } = response.data.data;
    return new Permission(id, name, email);
  }

  async getById(id: string): Promise<Permission> {
    const response = await httpAdapter.withAuthorization().get(`/permissions/${id}`);
    const { name, email } = response.data.data;
    return new Permission(id, name, email);
  }

  async delete(id: string): Promise<boolean> {
    return await httpAdapter
      .withAuthorization()
      .delete(`/permissions/${id}`)
      .then(() => true)
      .catch(() => false);
  }

  async update(id: string,params: object): Promise<Response> {
    return await httpAdapter
      .withAuthorization()
      .put(`/permissions/${id}`, params)
  }
}
