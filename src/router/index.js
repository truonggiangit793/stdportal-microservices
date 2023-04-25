import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/middlewares/auth";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "index",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "index" */ "../views/NotFound.vue"),
    },
    {
        path: "/system/account/all",
        name: "accountAll",
        component: () => import(/* webpackChunkName: "accountAll" */ "../views/system/AccountList.vue"),
    },

    {
        path: "/student",
        name: "studentMe",
        component: () => import(/* webpackChunkName: "studentMe" */ "../views/student/profileMe.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
    },
    {
        path: "*",
        name: "notfound",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "notfound" */ "../views/NotFound.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    linkExactActiveClass: "is-active",
    base: process.env.BASE_URL,
    routes,
});

export default router;
