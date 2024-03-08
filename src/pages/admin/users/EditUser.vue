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
    <router-link :to="{ name: 'users.index' }">List Users</router-link>
    <div>Atualizar o Usuário {{ form.name }}</div>

    <div class="error" v-if="errors.hasErrors">
        Dados inválidos
        <ul>
            <li v-for="error in errors.validations" :key="error">{{ error[0] }}</li>
        </ul>
    </div>

    <form action="#" method="post" @submit.prevent="updateUser">
        <input type="text" name="name" placeholder="Nome" v-model="form.name" :class="{ 'has-error': errors.validations.hasOwnProperty('name') }">
        <input type="email" name="email" placeholder="E-mail" v-model="form.email" :class="{ 'has-error': errors.validations.hasOwnProperty('email') }">
        <input type="password" name="password" placeholder="Senha" v-model="form.password" :class="{ 'has-error': errors.validations.hasOwnProperty('password') }">
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