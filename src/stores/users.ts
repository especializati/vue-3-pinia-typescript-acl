import { defineStore } from "pinia";
import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import User from "@/entities/User";

const userGateway = new UserGatewayHttp

export const useUsersStore = defineStore('users', {
    state: () => ({
        me: null as null | User,
        users: [] as User[]
    }),
    getters: {
        hasUsers: (state): boolean => state.users.length > 0
    },
    actions: {
        async auth(email: string, password: string): Promise<Response> {
            return await userGateway.login(email, password)
        },
        async getMe(): Promise<void> {
            await userGateway.getMe().then(user => this.me = user)
        }
    }
})