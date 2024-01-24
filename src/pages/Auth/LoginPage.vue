<script lang="ts">
import { ref } from 'vue'
import { useUsersStore } from '../../stores/users'

export default {
    setup() {
        const useStore = useUsersStore()
        const loading = ref(false)
        const email = ref('')
        const password = ref('')

        const auth = () => {
            loading.value = true
            useStore.auth(email.value, password.value)
            .then(response => alert(response.data.token))
            .catch(() => alert('ops, falha'))
            .finally(() => loading.value = false)
        }

        return {
            email,
            password,
            loading,
            auth
        }
    }
}
</script>

<template>
    <div>
        <h1>Login</h1>
        <form action="#" method="post" @submit.prevent="auth">
            <input type="email" name="email" placeholder="E-mail" v-model="email">
            <input type="password" name="password" placeholder="Senha" v-model="password">
            <button type="submit" :class="{ disabled : loading }">
                <span v-if="loading">Enviando...</span>
                <span v-else>Login</span>
            </button>
        </form>
        <a href="/esqueci-a-senha">Esqueci a senha</a>
    </div>
</template>