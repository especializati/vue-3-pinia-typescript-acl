<script lang="ts">
import { defineComponent } from 'vue'
import type { PAGINATION } from '@/types/pagination'

export default defineComponent({
    props: {
        data: {
            type: Object as () => PAGINATION,
            required: false,
            default: undefined
        }
    },
    setup(_, { emit }) {
        const loadPage = (page: number) => {
            emit('loadPage', page)
        }
        return { loadPage }
    }
})
</script>

<template>
    <div v-if="data && data.total > 0" class="paginator p-3">
        <div class="d-flex justify-content-between p-3">
            <p>Total: {{ data.total }}</p>
            <p>Página: {{ data.current_page }} Última Página {{ data.last_page }}</p>
        </div>
        <nav aria-label="navigation col-auto d-flex">
            <ul class="pagination justify-content-center align-items-center">
                <li class="page-item" v-if="data.current_page !== 1">
                    <a class="page-link" href="#" @click.prevent="loadPage(data.current_page - 1)">Anterior</a>
                </li>
                <li class="page-item" v-if="data.last_page > 1">
                    <a class="page-link" href="#" @click.prevent="loadPage(data.current_page + 1)">Próxima</a>
                </li>
            </ul>
        </nav>
    </div>
</template>