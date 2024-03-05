<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { onMounted, ref } from 'vue';

const useStore = useUsersStore()
const loading = ref(false)
onMounted(() => {
    loading.value = true
    useStore.getPaginate().finally(() => loading.value = false)
})
</script>

<template>
    <div>List Users</div>

    <div v-if="loading">Carregando...</div>

    <table>
        <thead>
            <tr>
                <td>Name</td>
                <td>E-mail</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in useStore.users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
            </tr>
        </tbody>
    </table>
</template>