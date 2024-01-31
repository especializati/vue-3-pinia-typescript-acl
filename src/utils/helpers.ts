import { useUsersStore } from "@/stores/users";

export const userHasPermission = (permissionName: string): Boolean => {
  const useStore = useUsersStore();
  const user = useStore.me;
  // if (user.isAdmin) return true
  let hasPermission = false;
  user?.permissions.map((permission) => {
    if (permission.name === permissionName) {
      hasPermission = true;
    }
  });

  return hasPermission;
}
