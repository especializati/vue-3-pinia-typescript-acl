<script setup lang="ts">
import { usePermissionsStore } from '@/stores/permissions';
import { onMounted, ref } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const permissionStore = usePermissionsStore()
const loading = ref(false)
onMounted(() => loadPermissions(1))

const filter = ref('')
const totalPerPage = ref(4)

const loadPermissions = (page: number = 1) => {
    loading.value = true
    permissionStore.getPaginate(page, filter.value, totalPerPage.value).finally(() => loading.value = false)
}
</script>

<template>
    <h2 class="text-4xl font-extrabold mt-4">Permissões</h2>
    <div class="flex">
        <router-link :to="{ name: 'permissions.create' }"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Criar
            Nova Permissão</router-link>
    </div>

    <div v-if="loading">Carregando...</div>

    <form action="#" method="get" @submit.prevent="loadPermissions(1)" class="flex mt-4">
        <input type="text" name="filter" placeholder="Filtrar" v-model="filter"
            class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker">
        <select name="totalPerPage" v-model="totalPerPage"
            class="shadow appearance-none border rounded py-2 px-3 mr-4 text-grey-darker">
            <option value="4">4</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
        <button type="submit"
            class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Filtrar</button>
    </form>

    <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg mt-4">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Name</th>
                    <th class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Descricão</th>
                    <th class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                <tr v-for="permission in permissionStore.permissions" :key="permission.id">
                    <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">{{ permission.name }}</td>
                    <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">{{ permission.description }}</td>
                    <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                        <router-link :to="{ name: 'permissions.show', params: { id: permission.id } }"
                            class="flex-no-shrink p-2 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-slate-500">Detalhes</router-link>
                        <router-link :to="{ name: 'permissions.edit', params: { id: permission.id } }"
                            class="flex-no-shrink p-2 ml-1 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-slate-500">Editar</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <pagination-component :data="permissionStore.meta" @loadPage="loadPermissions"></pagination-component>
</template>