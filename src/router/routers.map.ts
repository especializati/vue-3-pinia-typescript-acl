import AuthTemplate from "@/layouts/AuthTemplate.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";
import ForgotPassword from "@/pages/auth/ForgotPassword.vue";
import DefaultTemplate from "@/layouts/DefaultTemplate.vue";
import HomeAdmin from "@/pages/admin/home/HomeAdmin.vue";
import ListUsers from "@/pages/admin/users/ListUsers.vue";
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
        path: "",
        component: HomeAdmin,
        name: "admin.home",
      },
    ],
  },
];
