import HomePage from "../pages/HomePage.vue";
import ContactPage from "../pages/ContactPage.vue";
import AuthTemplate from "../layouts/AuthTemplate.vue";
import LoginPage from "../pages/Auth/LoginPage.vue";
import ForgotPassword from "../pages/Auth/ForgotPassword.vue";
import DefaultTemplate from "../layouts/DefaultTemplate.vue";

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
        component: HomePage,
        name: "admin.home",
      },
      {
        path: "contato",
        component: ContactPage,
        name: "admin.contact",
      },
    ],
  },
];
