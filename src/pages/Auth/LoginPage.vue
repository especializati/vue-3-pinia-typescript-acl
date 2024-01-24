<script lang="ts">
import { ref } from 'vue';
import UserGatewayHttp from '../../infra/gateway/UserGatewayHttp';

export default {
    setup() {
        const loading = ref(false)
        const email = ref('')
        const password = ref('')

        const auth = () => {
            loading.value = true
            const userGateway = new UserGatewayHttp
            userGateway.login(email.value, password.value)
            .then(response => console.log(response))
            .catch(error => console.log(error))
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