import { defineStore } from "pinia";
import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import User from "@/entities/User";
import Permission from "@/entities/Permission";
import { PAGINATION } from "@/types/pagination";

const userGateway = new UserGatewayHttp();

export const useUsersStore = defineStore("users", {
  state: () => ({
    me: null as null | User,
    users: [] as User[],
    userView: null as null | User,
    meta: undefined as undefined | PAGINATION,
  }),
  getters: {
    hasUsers: (state): boolean => state.users.length > 0,
  },
  actions: {
    async auth(email: string, password: string): Promise<Response> {
      return await userGateway.login(email, password);
    },
    async logout(): Promise<void> {
      await userGateway.logout().then(() => this.me = null)
    },
    async getMe() {
      await userGateway.getMe().then((user) => (this.me = user));
    },
    async getPaginate(
      page: number = 1,
      filter: string = "",
      totalPerPage: number = 15
    ): Promise<void> {
      await userGateway
        .getPaginate(page, filter, totalPerPage)
        .then((response) => {
          this.users = response.users;
          this.meta = response.meta;
        });
    },
    async create(params: PARAMS): Promise<void> {
      const user = await userGateway.create(params);
      this.users.push(user);
    },
    async getById(id: string): Promise<User> {
      return await userGateway.getById(id);
    },
    async destroy(id: string): Promise<void> {
      await userGateway
        .delete(id)
        .then(() => (this.users = this.users.filter((user) => user.id !== id)));
    },

    async update(params: PARAMS_WITH_ID): Promise<Response> {
      return await userGateway.update(params.id, params);
    },

    addUserInView(user: User): void {
      this.userView = user
    },

    addPermissionOfUser(permissions: Permission): void {
      this.userView?.addPermission(permissions)
    },

    removePermissionOfUser(permissions: Permission): void {
      const updatePermissions = this.userView?.permissions.filter((permission) => permission.id !== permissions.id)
      this.userView?.syncPermissions(updatePermissions!)
    },

    async syncPermissions(): Promise<Response> {
      return await userGateway.syncPermissions(this.userView!)
    }
  },
});

type PARAMS = {
  name: string;
  email: string;
  password: string;
};

type PARAMS_WITH_ID = {
  id: string;
} & PARAMS;
