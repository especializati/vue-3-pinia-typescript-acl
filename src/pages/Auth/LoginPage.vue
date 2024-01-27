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
    <div>
        <h1>Login</h1>
        <form action="#" method="post" @submit.prevent="auth">
            <div v-if="error.active">
                <p>{{ error.msgError }}</p>
            </div>
            <input type="email" name="email" placeholder="E-mail" v-model="email">
            <input type="password" name="password" placeholder="Senha" v-model="password">
            <button type="submit" :class="{ disabled: loading }">
                <span v-if="loading">Enviando...</span>
                <span v-else>Login</span>
            </button>
        </form>
        <a href="/esqueci-a-senha">Esqueci a senha</a>
    </div>
</template>