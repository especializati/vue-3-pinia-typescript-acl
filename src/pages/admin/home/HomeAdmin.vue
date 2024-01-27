<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { onMounted } from 'vue';
const useStore = useUsersStore()
onMounted(() => {
    useStore.getMe()
})
</script>

<template>
    <p>Olá {{ useStore.me?.name }}</p>
    <div>Home Admin</div>
</template>