<template>
    <div>
        <DashboardMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Course data list:</h1>
            </div>
            <div class="flex items-center mb-4 text-gray-700 font-bold uppercase">
                <h1 class="ml-2">Total course: {{ totalCourse }}</h1>
            </div>
            <div class="overflow-x-auto relative">
                <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">Code</th>
                            <th scope="col" class="py-3 px-6">Course name</th>
                            <th scope="col" class="py-3 px-6">Credits</th>
                            <th scope="col" class="py-3 px-6">Description</th>
                            <th scope="col" class="py-3 px-6">Created At</th>
                            <th scope="col" class="py-3 px-6">Last modified</th>
                            <th scope="col" class="py-3 px-6" v-if="payload.role == 'ADMIN'">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="courseList && courseList.length > 0">
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(course, i) in courseList" :key="i">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ course.code }}</th>
                            <td class="py-4 px-6">{{ course.name }}</td>
                            <td class="py-4 px-6">{{ course.credits }}</td>
                            <td class="py-4 px-6">{{ course.description }}</td>
                            <td class="py-4 px-6">{{ dateFormat(course.createdAt) }}</td>
                            <td class="py-4 px-6">{{ dateFormat(course.updatedAt) }}</td>
                            <td class="py-4 px-6" v-on:click="courseRemoveHandler(course.code)" v-if="payload.role == 'ADMIN'">
                                <div class="text-red-500 cursor-pointer"><ThemifyIcon icon="trash" />Delete</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!courseList" class="flex w-full justify-center p-8">
                    <h1 class="">Empty list, there is no data!</h1>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import { mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import dateFormat from "@/helpers/dateFormat";
import DashboardMenu from "@/components/DashboardMenu.vue";

export default {
    data() {
        return {
            isLoading: true,
            courseList: [],
            totalCourse: 0,
        };
    },
    async mounted() {
        this.fetchData();
    },
    methods: {
        dateFormat,
        async fetchData() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/course/get-all`)
                .then((res) => {
                    if (res.data.status) {
                        this.courseList = res.data.data.list;
                        this.totalCourse = res.data.data.total;
                    }
                })
                .catch(() => {
                    this.courseList = [];
                    this.totalCourse = 0;
                });
            this.isLoading = false;
        },
        async courseRemoveHandler(userCode) {
            this.isLoading = true;
            await axios
                .delete(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/course/delete/${userCode}`)
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.message);
                    } else {
                        this.toastify.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.message) return this.$store.state.toastify.error(err.message);
                    this.$store.state.toastify.error(err.response.data.message);
                });
            this.fetchData();
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
    components: { ThemifyIcon, Loading, DashboardMenu },
};
</script>

<style></style>
