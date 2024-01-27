import AuthTemplate from "@/layouts/AuthTemplate.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";
import ForgotPassword from "@/pages/auth/ForgotPassword.vue";
import DefaultTemplate from "@/layouts/DefaultTemplate.vue";
import HomeAdmin from "@/pages/admin/home/HomeAdmin.vue";

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
        path: "",
        component: HomeAdmin,
        name: "admin.home",
      },
    ],
  },
];
