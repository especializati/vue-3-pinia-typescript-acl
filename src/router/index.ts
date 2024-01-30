import { NavigationGuardNext, RouteLocationNormalized, createRouter, createWebHistory } from "vue-router";
import routes from './routers.map'
import { useUsersStore } from "@/stores/users";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userStore = useUsersStore()
  const user = userStore.me
  if (user) return next()

  const routeName = to.name
  if (routeName !== 'auth.login') {
    return router.push({ name: 'auth.login' })
  }

  next()
})

export default router;
