<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { onMounted, ref } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const useStore = useUsersStore()
const loading = ref(false)
onMounted(() => loadUsers(1))

const filter = ref('')
const totalPerPage = ref(4)

const loadUsers = (page: number = 1) => {
    loading.value = true
    useStore.getPaginate(page, filter.value, totalPerPage.value).finally(() => loading.value = false)
}
</script>

<template>
    <div>List Users</div>
    <router-link :to="{ name: 'users.create' }">Criar Novo Usuário</router-link>

    <div v-if="loading">Carregando...</div>

    <form action="#" method="get" @submit.prevent="loadUsers(1)">
        <input type="text" name="filter" placeholder="Filtrar" v-model="filter">
        <select name="totalPerPage" v-model="totalPerPage">
            <option value="4">4</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
        <button type="submit">Filtrar</button>
    </form>

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

    <pagination-component :data="useStore.meta" @loadPage="loadUsers"></pagination-component>
</template>