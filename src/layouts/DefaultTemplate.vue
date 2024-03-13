<script lang="ts">
export default {
    name: 'DefaultTemplate',
}
</script>

<template>
    <div class="flex items-center justify-center bg-slate-800 w-full p-2">
        <router-link :to="{ name: 'admin.home' }"
            class="text-white hover:text-white px-3 py-2 rounded transition duration-150 ease-in-out"
            active-class="text-white">
            Home
        </router-link>
        <router-link :to="{ name: 'users.index' }" v-can="'users.index'"
            class="text-white hover:text-white px-3 py-2 rounded transition duration-150 ease-in-out"
            active-class="text-white">
            Usuários
        </router-link>
    </div>


    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div class="bg-white rounded p-6 m-4 w-full">
            <router-view></router-view>
        </div>
    </div>
</template>