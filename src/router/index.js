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
        component: () => import(/* webpackChunkName: "accountAll" */ "../views/system/accounts/AccountList.vue"),
    },
    {
        path: "/system/account/new",
        name: "accountNew",
        component: () => import(/* webpackChunkName: "accountNew" */ "../views/system/accounts/AccountNew.vue"),
    },
    {
        path: "/system/department/all",
        name: "departmentAll",
        component: () =>
            import(/* webpackChunkName: "departmentAll" */ "../views/system/departments/DepartmentList.vue"),
    },
    {
        path: "/system/department/new",
        name: "departmentNew",
        component: () =>
            import(/* webpackChunkName: "departmentNew" */ "../views/system/departments/DepartmentNew.vue"),
    },
    {
        path: "/system/academic/analysis",
        name: "academicAnalysis",
        component: () =>
            import(/* webpackChunkName: "academicAnalysis" */ "../views/system/academic/AcademicAnalysis.vue"),
    },
    {
        path: "/system/schedule/student",
        name: "studentSchedule",
        component: () => import(/* webpackChunkName: "student" */ "../views/system/academic/StudentSchedule.vue"),
    },
    {
        path: "/system/academic/student",
        name: "academicStudent",
        component: () =>
            import(/* webpackChunkName: "academicStudent" */ "../views/system/academic/StudentAcademic.vue"),
    },
    {
        path: "/student",
        name: "studentMe",
        component: () => import(/* webpackChunkName: "studentMe" */ "../views/student/profileMe.vue"),
    },
    {
        path: "/student/academic",
        name: "studentAcademic",
        component: () => import(/* webpackChunkName: "studentMe" */ "../views/student/academicList.vue"),
    },
    {
        path: "/student/enroll",
        name: "studentEnroll",
        component: () => import(/* webpackChunkName: "studentMe" */ "../views/student/enrollCourse.vue"),
    },
    {
        path: "/system/course/data/all",
        name: "courseList",
        component: () => import(/* webpackChunkName: "courseList" */ "../views/system/courses/CourseList.vue"),
    },
    {
        path: "/system/course/data/new",
        name: "courseNew",
        component: () => import(/* webpackChunkName: "courseNew" */ "../views/system/courses/CourseNew.vue"),
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
