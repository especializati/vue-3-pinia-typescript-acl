<script lang="ts">
import NavBar  from './partials/NavBar.vue'

export default {
    name: 'DefaultTemplate',
    components: {
        NavBar
    }
}
</script>

<template>
    <NavBar />
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div class="bg-white rounded p-6 m-4 w-full">
            <router-view></router-view>
        </div>
    </div>
</template>