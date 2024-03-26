<script setup lang="ts">
import { usePermissionsStore } from '@/stores/permissions';
import { onMounted, ref } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { useUsersStore } from '@/stores/users';
import router from '@/router';
import Permission from '@/entities/Permission';

const permissionStore = usePermissionsStore()
const userStore = useUsersStore()
const loading = ref(false)
onMounted(function () {
    if (userStore.userView === null) {
        return router.push({ name: 'users.index' })
    }
    loadPermissions(1)
})

const filter = ref('')
const totalPerPage = ref(50)

const loadPermissions = (page: number = 1) => {
    loading.value = true
    permissionStore.getPaginate(page, filter.value, totalPerPage.value).finally(() => loading.value = false)
}

const hasPermission = (permissionName: string): boolean => {
    let hasPermission = false
    userStore.userView?.permissions.forEach((permission: any) => {
        if (permission.name === permissionName) {
            hasPermission = true
        }
    })

    return hasPermission
}

const handleCheckboxChange = (permission: Permission, event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.checked) {
        userStore.addPermissionOfUser(permission)
        return
    }
    userStore.removePermissionOfUser(permission)
}
</script>

<template>
    <h2 class="text-4xl font-extrabold mt-4">Permissões do Usuário {{ userStore.userView?.name }}</h2>

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
                        <input type="checkbox" :checked="hasPermission(permission.name)" @click="handleCheckboxChange(permission, $event)">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <pagination-component :data="permissionStore.meta" @loadPage="loadPermissions"></pagination-component>
</template>