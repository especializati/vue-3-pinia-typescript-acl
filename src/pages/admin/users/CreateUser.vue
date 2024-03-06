<script lang="ts">
import router from '@/router';
import { useUsersStore } from '@/stores/users';
import { reactive, ref } from 'vue';

export default {
    name: 'CreateUser',
    setup() {
        const useStore = useUsersStore()
        const loading = ref(false)
        const name = ref('')
        const email = ref('')
        const password = ref('')

        const errors = reactive({
            hasErrors: false,
            validations: {}
        })

        const createUser = async () => {
            loading.value = true
            reset()
            await useStore.create({
                name: name.value,
                email: email.value,
                password: password.value
            }).then(() => {
                router.push({ name: 'users.index' })
            }).catch((error: any) => {
                if (error.response.status === 422) {
                    errors.hasErrors = true
                    errors.validations = error.response.data.errors
                }
            })
            .finally(() => loading.value = false)
        }

        const reset = () => {
            errors.hasErrors = false
            errors.validations = {}
        }

        return {
            name, email, password, createUser, loading, errors
        }
    },
}
</script>

<template>
    <router-link :to="{ name: 'users.index' }">List Users</router-link>
    <div>Create User</div>

    <div class="error" v-if="errors.hasErrors">
        Dados inválidos
        <ul>
            <li v-for="error in errors.validations" :key="error">{{ error[0] }}</li>
        </ul>
    </div>

    <form action="#" method="post" @submit.prevent="createUser">
        <input type="text" name="name" placeholder="Nome" v-model="name" :class="{ 'has-error': errors.validations.hasOwnProperty('name') }">
        <input type="email" name="email" placeholder="E-mail" v-model="email" :class="{ 'has-error': errors.validations.hasOwnProperty('email') }">
        <input type="password" name="password" placeholder="Senha" v-model="password" :class="{ 'has-error': errors.validations.hasOwnProperty('password') }">
        <button type="submit" :disabled="loading">
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