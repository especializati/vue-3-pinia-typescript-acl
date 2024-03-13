<script lang="ts">
import User from '@/entities/User';
import router from '@/router';
import { useUsersStore } from '@/stores/users';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'EditUser',
    setup() {
        const route = useRoute()
        const userId = computed(() => route.params.id.toString())
        const useStore = useUsersStore()
        const loading = ref(false)
        const form = reactive({
            name: '',
            email: '',
            password: ''
        })

        const errors = reactive({
            hasErrors: false,
            validations: {}
        })

        onMounted(async () => {
            loading.value = true
            await useStore.getById(userId.value)
                    .then((user: User) => Object.assign(form, user))
                    .catch(() => router.push({ name: 'users.index' }))
                    .finally(() => loading.value = false)
        })

        const reset = () => {
            errors.hasErrors = false
            errors.validations = {}
        }

        const updateUser = () => {
            reset()
            loading.value = true
            useStore.update({id: userId.value, ...form})
                .then(() => router.push({ name: 'users.index' }))
                .catch((error: any) => {
                    if (error.response.status === 422) {
                        errors.hasErrors = true
                        errors.validations = error.response.data.errors
                    }
                })
                .finally(() => loading.value = false)
        }

        return {
            form, loading, errors, updateUser
        }
    },
}
</script>

<template>
    <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li class="inline-flex items-center">
                <router-link :to="{ name: 'admin.home' }"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black-600 dark:text-gray-400 dark:hover:text-black">
                    <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                </router-link>
            </li>
            <li aria-current="page">
                <div class="flex items-center">
                    <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4" />
                    </svg>
                    <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Usuários</span>
                </div>
            </li>
        </ol>
    </nav>

    <h2 class="text-4xl font-extrabold mt-4">Editar Usuário</h2>

    <div v-if="errors.hasErrors" class="alert" role="alert">
        <div class="bg-yellow-500 text-white font-bold rounded-t px-4 py-2">
            Dados inválidos
        </div>
        <ul class="border border-t-0 border-red-400 rounded-b bg-yellow-100 px-4 py-3 text-red-700">
            <li v-for="error in errors.validations" :key="error">{{ error[0] }}</li>
        </ul>
    </div>

    <form action="#" method="post" @submit.prevent="updateUser">
        <div class="mt-4">
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nome:</label>
            <input type="text" name="name" placeholder="Nome" v-model="form.name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                :class="{ 'has-error': errors.validations.hasOwnProperty('name') }">
        </div>
        <div class="mt-4">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">E-mail:</label>
            <input type="email" name="email" placeholder="E-mail" v-model="form.email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                :class="{ 'has-error': errors.validations.hasOwnProperty('email') }">
        </div>
        <div class="mt-4">
            <label for="senha" class="block text-sm font-medium leading-6 text-gray-900">Senha:</label>
            <input type="password" name="password" placeholder="Senha" v-model="form.password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                :class="{ 'has-error': errors.validations.hasOwnProperty('password') }">
        </div>
        <button type="submit" :disabled="loading"
            class="mt-4 w-full bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded">
            <span v-if="loading">Enviando...</span>
            <span v-else>Enviar</span>
        </button>
    </form>
</template>

<style scoped>
.has-error {
    color: red;
    border-color: red;
}
</style>