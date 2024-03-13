<script lang="ts">
import { reactive, ref } from 'vue'
import { useUsersStore } from '@/stores/users'
import router from '@/router'

export default {
    setup() {
        const useStore = useUsersStore()
        const loading = ref(false)
        const email = ref('')
        const password = ref('')
        const error = reactive({
            msgError: '',
            status: 0,
            active: false
        })

        const auth = () => {
            loading.value = true
            useStore.auth(email.value, password.value)
                .then(() => router.push({ name: 'admin.home' }))
                .catch(responseError => {
                    error.msgError = 'Falha ao autenticar'
                    error.status = responseError.response.status
                    error.active = true

                    if (error.status === 422) error.msgError = 'Dados inválidos'
                    if (error.status === 404) error.msgError = 'Usuário não encontrado'
                })
                .finally(() => loading.value = false)
        }

        return {
            email,
            password,
            loading,
            auth,
            error
        }
    }
}
</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Acessar sua conta
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#" method="post" @submit.prevent="auth">
                        <div>
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                            <input type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="seu@email.com" v-model="email">
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                            <input type="password" name="password" id="password" placeholder="Sua senha"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                v-model="password">
                        </div>
                        <div class="flex items-center justify-between">
                            <router-link :to="{ name: 'forgot.password' }"
                                class="text-sm font-light text-gray-500 dark:text-gray-400">Esqueceu a senha?</router-link>
                        </div>
                        <div v-if="error.active"
                            class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                            role="alert">
                            <span class="font-medium">Erro!</span> {{ error.msgError }}
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium bg-gray-700 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            :disabled="loading" :class="{ 'disabled': loading }">
                            <span v-if="loading">Entrando...</span>
                            <span v-else>Entrar</span>
                        </button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Não tem uma conta ainda? <a href="#"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Cadastre-se!</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>