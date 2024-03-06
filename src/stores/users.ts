import { defineStore } from "pinia";
import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import User from "@/entities/User";
import { PAGINATION } from "@/types/pagination";

const userGateway = new UserGatewayHttp

export const useUsersStore = defineStore('users', {
    state: () => ({
        me: null as null | User,
        users: [] as User[],
        meta: undefined as undefined | PAGINATION
    }),
    getters: {
        hasUsers: (state): boolean => state.users.length > 0
    },
    actions: {
        async auth(email: string, password: string): Promise<Response> {
            return await userGateway.login(email, password)
        },
        async getMe() {
            await userGateway.getMe().then(user => this.me = user)
        },
        async getPaginate(page: number = 1, filter: string = '', totalPerPage: number = 15): Promise<void> {
            await userGateway.getPaginate(page, filter, totalPerPage).then(response => {
                this.users = response.users
                this.meta = response.meta
            })
        },
        async create(params: PARAMS): Promise<void> {
            const user = await userGateway.create(params)
            this.users.push(user)
        },
        async getById(id: string): Promise<User> {
            return await userGateway.getById(id)
        }
    }
})

type PARAMS = {
    name: string
    email: string
    password: string
}