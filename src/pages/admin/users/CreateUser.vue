<script lang="ts">
import router from '@/router';
import { useUsersStore } from '@/stores/users';
import { ref } from 'vue';

export default {
    name: 'CreateUser',
    setup() {
        const useStore = useUsersStore()
        const loading = ref(false)
        const name = ref('')
        const email = ref('')
        const password = ref('')

        const createUser = async () => {
            loading.value = true
            await useStore.create({
                name: name.value,
                email: email.value,
                password: password.value
            }).then(() => {
                router.push({ name: 'users.index' })
            }).finally(() => loading.value = false)
        }

        return {
            name, email, password, createUser, loading
        }
    },
}
</script>

<template>
    <router-link :to="{ name: 'users.index' }">List Users</router-link>
    <div>Create User</div>

    <form action="#" method="post" @submit.prevent="createUser">
        <input type="text" name="name" placeholder="Nome" v-model="name">
        <input type="email" name="email" placeholder="E-mail" v-model="email">
        <input type="password" name="password" placeholder="Senha" v-model="password">
        <button type="submit" :disabled="loading">
            <span v-if="loading">Enviando...</span>
            <span v-else>Enviar</span>
        </button>
    </form>
</template>