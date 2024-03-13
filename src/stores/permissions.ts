import { defineStore } from "pinia";
import PermissionGatewayHttp from "@/infra/gateway/PermissionGatewayHttp";
import Permission from "@/entities/Permission";
import { PAGINATION } from "@/types/pagination";

const permissionGateway = new PermissionGatewayHttp();

export const usePermissionsStore = defineStore("permissions", {
  state: () => ({
    me: null as null | Permission,
    permissions: [] as Permission[],
    meta: undefined as undefined | PAGINATION,
  }),
  getters: {
    hasPermissions: (state): boolean => state.permissions.length > 0,
  },
  actions: {
    async getPaginate(
      page: number = 1,
      filter: string = "",
      totalPerPage: number = 15
    ): Promise<void> {
      await permissionGateway
        .getPaginate(page, filter, totalPerPage)
        .then((response) => {
          this.permissions = response.permissions;
          this.meta = response.meta;
        });
    },
    async create(params: PARAMS): Promise<void> {
      const permission = await permissionGateway.create(params);
      this.permissions.push(permission);
    },
    async getById(id: string): Promise<Permission> {
      return await permissionGateway.getById(id);
    },
    async destroy(id: string): Promise<void> {
      await permissionGateway
        .delete(id)
        .then(() => (this.permissions = this.permissions.filter((permission) => permission.id !== id)));
    },

    async update(params: PARAMS_WITH_ID): Promise<Response> {
      return await permissionGateway.update(params.id, params);
    },
  },
});

type PARAMS = {
  name: string;
  description: string;
};

type PARAMS_WITH_ID = {
  id: string;
} & PARAMS;
