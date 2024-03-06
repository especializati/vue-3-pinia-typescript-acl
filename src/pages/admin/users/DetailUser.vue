<script lang="ts">
import { useRoute } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import { computed, reactive, ref } from 'vue';

export default {
    name: 'ListUser',
    setup() {
        const route = useRoute()
        const userId = computed(() => route.params.id.toString())

        return {
            userId
        }
    },
}
</script>

<template>
    <router-link :to="{ name: 'users.index' }">List Users</router-link>
    <div>List User ({{ userId }})</div>
</template>