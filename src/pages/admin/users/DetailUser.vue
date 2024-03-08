<script lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useUsersStore } from '@/stores/users';
import User from '@/entities/User';
import router from '@/router';

export default {
    name: 'ListUser',
    setup() {
        const route = useRoute()
        const userId = computed(() => route.params.id.toString())
        const useStore = useUsersStore()
        const user = ref<User | null>(null)

        const loading = ref(false)

        onMounted(async () => {
            loading.value = true
            await useStore.getById(userId.value)
                    .then((data: User) => user.value = data)
                    .catch(() => router.push({ name: 'users.index' }))
                    .finally(() => loading.value = false)
        })

        const loadingDelete = ref(false)
        const deleteUser = () => {
            loadingDelete.value = true
            useStore.destroy(userId.value).then(() => {
                router.push({ name: 'users.index' })
            }).finally(() => loadingDelete.value = false)
        }

        return {
            loading, user, deleteUser, loadingDelete
        }
    },
}
</script>

<template>
    <router-link :to="{ name: 'users.index' }">List Users</router-link>
    <div v-if="loading">Carregando...</div>
    <div>List User</div>
    <ul>
        <li><strong>Nome</strong>{{ user?.name }}</li>
        <li><strong>E-mail</strong>{{ user?.email }}</li>
    </ul>

    <div v-if="user">
        <span v-if="loadingDelete">Deletando...</span>
        <a v-else href="#" @click.prevent="deleteUser">Deletar o Usuário {{ user.name }}</a>
    </div>
</template>