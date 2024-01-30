import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordName,
  createRouter,
  createWebHistory,
} from "vue-router";
import routes from "./routers.map";
import { useUsersStore } from "@/stores/users";
import { NAME_TOKEN } from "@/utils/constants";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const userStore = useUsersStore();
    const user = userStore.me;
    if (user) return next();

    const routeName = to.name
    const token = localStorage.getItem(NAME_TOKEN);
    if (token) {
      await userStore
        .getMe()
        .then(() => {
          if (isRouteAuth(routeName)) {
            return router.push({name: 'admin.home'})
          }
          return next();
        })
        .catch(() => {
          if (!isRouteAuth(routeName)) {
            return router.push({ name: 'auth.login' });
          }
        });
    } else if (!isRouteAuth(routeName)) {
      next()
      return router.push({ name: 'auth.login' });
    }

    next();
  }
);

function isRouteAuth(routeName: RouteRecordName | null | undefined): boolean {
  return routeName === 'auth.login' || routeName === 'forget.password' || routeName === 'reset.password'
}

export default router;
