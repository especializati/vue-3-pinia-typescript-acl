import AuthTemplate from "@/layouts/AuthTemplate.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";
import ForgotPassword from "@/pages/auth/ForgotPassword.vue";
import DefaultTemplate from "@/layouts/DefaultTemplate.vue";
import HomeAdmin from "@/pages/admin/home/HomeAdmin.vue";
import ListPermissions from "@/pages/admin/permissions/ListPermissions.vue";
import CreatePermission from "@/pages/admin/permissions/CreatePermission.vue";
import DetailPermission from "@/pages/admin/permissions/DetailPermission.vue";
import EditPermission from "@/pages/admin/permissions/EditPermission.vue";
import ListUsers from "@/pages/admin/users/ListUsers.vue";
import PermissionsOfUser from "@/pages/admin/users/PermissionsOfUser.vue";
import CreateUser from "@/pages/admin/users/CreateUser.vue";
import DetailUser from "@/pages/admin/users/DetailUser.vue";
import EditUser from "@/pages/admin/users/EditUser.vue";

export default [
  {
    path: "/",
    component: AuthTemplate,
    children: [
      {
        path: "",
        component: LoginPage,
        name: "auth.login",
      },
      {
        path: "esqueci-a-senha",
        component: ForgotPassword,
        name: "forgot.password",
      },
    ],
  },
  {
    path: "/admin",
    component: DefaultTemplate,
    children: [
      {
        path: "permissions/:id/edit",
        component: EditPermission,
        name: "permissions.edit",
        props: true
      },
      {
        path: "permissions/:id",
        component: DetailPermission,
        name: "permissions.show",
        props: true
      },
      {
        path: "permissions/novo",
        component: CreatePermission,
        name: "permissions.create",
      },
      {
        path: "permissions",
        component: ListPermissions,
        name: "permissions.index",
      },
      {
        path: "users/:id/edit",
        component: EditUser,
        name: "users.edit",
        props: true
      },
      {
        path: "users/:id",
        component: DetailUser,
        name: "users.show",
        props: true
      },
      {
        path: "users/novo",
        component: CreateUser,
        name: "users.create",
      },
      {
        path: "users",
        component: ListUsers,
        name: "users.index",
      },
      {
        path: "users/permissions",
        component: PermissionsOfUser,
        name: "users.permissions",
      },
      {
        path: "",
        component: HomeAdmin,
        name: "admin.home",
      },
    ],
  },
];
